const WebSocket = require('ws');
const Logger = require("disnode-logger")
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

module.exports = class VoiceConnection {

    constructor(guildID, channelID) {
        this.guildID = guildID;
        this.channelID = channelID;


        this.ws = null;
    }
    OnServerUpdate(connectionInfo) {
        this.endpoint = connectionInfo.endpoint;
        this.token = connectionInfo.token;
        this.serverReady = true;
        Logger.Info("VoiceConnection-" + this.guildID, "OnServerUpdate", "Server Updates!")
        this.CheckIfRead();

    }
    OnStateUpdate(stateInfo) {
        this.userID = stateInfo.user_id;
        this.sessionID = stateInfo.session_id;
        Logger.Info("VoiceConnection-" + this.guildID, "OnStateUpdate", "State Updated!")
        this.stateReady = true;
        this.CheckIfRead();
    }
    CheckIfRead() {
        if (this.serverReady && this.stateReady) {
            this.ConnectToWS();
            Logger.Success("VoiceConnection-" + this.guildID, "CheckIfRead", "Voice Connection ready for VC connection!")

        }
    }
    ConnectToWS() {
        var self = this;
        Logger.Info("VoiceConnection-" + this.guildID, "ConnectToWS", "Connecting to Voice WebSocket: " + self.endpoint)
        console.dir(self)
        self.ws = new WebSocket("ws://" + self.endpoint);
        self.BindWS();
    }

    BindWS() {
        var self = this;
        self.ws.on('open', function () {
            Logger.Success("VoiceConnection-" + self.guildID, "WS", "Connected to Voice WebSocket!");
            self.IdentifyToWs();
        });

        self.ws.on('close', function (code, reason) {
            Logger.Error("VoiceConnection-" + self.guildID, "WS", "WS closed! Code: " + code + " Reason: " + reason);
        });

        self.ws.on("message", function (data, flags) {
            self.ParseWS(data);
        });
        self.ws.on('error', function (error) {
            console.log(error);
            var ErrorObject = {
                message: error.message,
                status: "WS-000",
                display: "WebSocket Error [" + error.response.status + "] " + error.message,
                raw: error
            }
            Logger.Error("DisnodeLite-Bot", "WS-ERROR", ErrorObject.display);
            self.emit("error", ErrorObject);
        });
    }

    ParseWS(wsData) {
        wsData = JSON.parse(wsData)
        var op = wsData.op;
        var data = wsData.d;
        var self = this;
        switch (op) {
            // Ready - 	complete the websocket handshake
            case 2: {
                self.udp = {
                    port: data.port,
                    srrc: data.srrc,
                    modes: data.modes,
                    ip: data.ip
                }

                self.ConnectToUDP();
            }
            break;

            //Session Description
            case 4: {
                Logger.Success("VoiceConnection-" + this.guildID, "WS4-SessionDescription", "Agreed on protocol. Got Session info.");
                self.udp.mode = data.mode;
                self.udp.secret = data.secret;
            }
            break;
            //Heartbeat ACK
            case 6: {

            }
            break;
            //Hello o/
            case 8: {
                self.StartHeartbeat(data.heartbeat_interval);
            }
                break;

            // Resumed
            case 9: {

            } break;

            //Bye! o/ (Client Disconnected forn the voice channel)
            case 13: {

            }

        }
    }

    IdentifyToWs() {
        var self = this;
        var packet = {
            op: 0,
            d: {
                server_id: self.guildID,
                user_id: self.userID,
                token: self.token,
                session_id: self.sessionID,
            }
        }
        self.ws.send(JSON.stringify(packet))
        Logger.Info("VoiceConnection-" + this.guildID, "IdentifyToWs", "Identifing to WS.")
    }

    StartHeartbeat(interval) {
        var self = this;
        self.heartbeatNonce = 0;
        Logger.Info("VoiceConnection-" + this.guildID, "StartHeartBeat", "Starting Voice WS Heartbeat: " + interval)
        setInterval(() => {
            self.heartbeatNonce++;
            var packet = {
                op: 3,
                d: self.heartbeatNonce
            };
            self.ws.send(JSON.stringify(packet))
        }, interval);
    }

    ConnectToUDP() {
        var self = this;
        client.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            client.close();
        });

        self.DiscoverIP();
        
    }
    DiscoverIP(){
        Logger.Info("VoiceConnection-" + this.guildID, "DiscoverIP", "Discovering External IP/PORT");
        var self = this;
        var message = new Buffer(70)
        client.send(message, 0, message.length,self.udp.port , self.udp.ip, function (err, bytes) {
            if (err) throw err;
        });

        client.on('message', (msg, rinfo) => {
            var ipBuffer = msg.slice(4,(70-4-2));
            var ip = ipBuffer.toString();
            ip = ip.replace(/\0[\s\S]*$/g,'');
            var portBuffer = msg.slice(68);
            var port = portBuffer.readInt16LE() * -1;

            self.external = {
                ip: ip,
                port: port
            }
            Logger.Success("VoiceConnection-" + this.guildID, "DiscoverIP", "Discoverede External IP/PORT: " + self.external.ip + ":" + self.external.port);
            self.AttemptSelectProtocal();
        });
    }
    AttemptSelectProtocal(){
        var self = this;
        if(!self.UDPConnected){
            Logger.Info("VoiceConnection-" + this.guildID, "AttemptSelectProtocol", "Sending Protocol Info to UDP");
            var packet = {
                op: 1,
                d:{
                    protocol: "udp",
                    data:{
                        address: self.external.ip,
                        port: self.external.port,
                        mode: self.udp.modes[1]
                    }
                }
            }
            

            self.ws.send(JSON.stringify(packet));
        }
    }

    SendVoiceData(voiceData){
        
    }
}
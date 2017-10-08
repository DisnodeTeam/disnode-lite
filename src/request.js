exports.identify = function (token, shardID = 0, shardCount = 1) {
  return{
    op: 2,
    d:{
      "token": token,
      "properties": {
        "$os": process.platform,
        "$browser": "Disnode",
        "$device": "Disnode",
        "$referrer": "",
        "$referring_domain": ""
      },
      "compress": false,
      "large_threshold": 250,
      "shard": [shardID, shardCount]}
  }
};
exports.resume = function(token, sessionID, s) {
  return {
    "token": token,
    "session_id": sessionID,
    "seq": s
  }
};

exports.heartbeat = function (s) {
  return{
    "op":1,
    "d": parseInt(s) || null
  }
};

exports.presence = function (name) {
  return{
    op:3,
    d:{
      "idle_since": null,
      "game":{
        "name": name,

      }
    }
  }
};


exports.voiceServer = function(guildID, channelID) {
  return {
    "op": 4,
    "d": {
        "guild_id": guildID,
        "channel_id": channelID,
        "self_mute": false,
        "self_deaf": false
    }

  }
};
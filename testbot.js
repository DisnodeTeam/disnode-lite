var DisnodeLite = require("./index.js");

var shardID = 0;
var maxShards = 1;
if(process.env.INSTID){
  console.log("Found PM2 Instancing");
  shardID = process.env.INSTID;
  maxShards = process.env.instances;
}
console.log("Sid: " + shardID + " mx: " + maxShards);

var bot = new DisnodeLite({key: "MTcwMDIwODA3MTk4NjM4MDgw.DJTz2A.ToOIcdKzopRKZq8zCDJHyd_y5ak", sharding: [shardID,maxShards]});

var arrayTest = ["test", "test2", "test3"]

bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})

bot.on("message", (channelID, user, userID, message, params, event)=>{
  if(data.content.includes("*cache-guilds")){
    var params = data.content.toString().split(" ");

    if(params[1]){
      bot.SendMessage(data.channel_id, "Cached Guild: " + bot.guilds.Get(params[1]).name)
    }else{
      bot.SendMessage(data.channel_id, "Cached Guilds: " + bot.guilds.length)
    }
   
  }

  if(data.content.includes("*cache-channel")){
    bot.SendMessage(data.channel_id, "Cached Channels: " + bot.channels.length)
  }
})

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

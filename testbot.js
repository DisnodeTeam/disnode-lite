var DisnodeLite = require("./index.js");

var shardID = 0;
var maxShards = 1;
if(process.env.INSTID){
  console.log("Found PM2 Instancing");
  shardID = process.env.INSTID;
  maxShards = process.env.instances;
}
console.log("Sid: " + shardID + " mx: " + maxShards);

var bot = new DisnodeLite({
  key: "", 
  sharding: [shardID,maxShards],
  cacheSettings: {
    cacheChannels: false,
  }
});

var arrayTest = ["test", "test2", "test3"]

bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})

bot.on("message",({message, channelID})=>{
  if(message.includes("*cache-guilds")){
    var params = message.toString().split(" ");

    if(params[1]){
      bot.SendMessage(channelID, "Cached Guild: " + bot.guilds.Get(params[1]).name)
    }else{
      bot.SendMessage(channelID, "Cached Guilds: " + bot.guilds.length)
    }
   
  }

  if(data.content.includes("*cache-channel")){
    bot.SendMessage(channelID, "Cached Channels: " + bot.channels.GetArray().length)
  }
})

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

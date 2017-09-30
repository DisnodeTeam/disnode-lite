var DisnodeLite = require("./index.js");
var config = require('./config');
var bot = new DisnodeLite({
  key: config.key
  }
});


bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})

bot.on("message",({message, channelID})=>{

  var params = message.toString().split(" ");
  if(message.includes("*cache-guilds")){


    if(params[1]){

      bot.SendMessage(channelID, "```" + JSON.stringify(bot.guilds.Get(params[1])[params[2] || "name"], null, 2) + "```")
    }else{
      bot.SendMessage(channelID, "Cached Guilds: " + bot.guilds.length)
    }

  }

  if(message.includes("*cache-channel")){
    console.log(bot.channels.Get(params[1]));
    if(params[1]){
      bot.SendMessage(channelID, "```" + JSON.stringify(bot.channels.Get(params[1])[params[2] || "name"], null, 2) + "```")
    }else{
      bot.SendMessage(channelID, "Cached Channels: " + bot.channels.GetArray().length)
    }
  }

  if(message.includes("*cache-member")){
    if(params[1]){
      bot.SendMessage(channelID, "```" + JSON.stringify(bot.members.Get(params[1])[params[2] || "name"], null, 2) + "```")
    }else{
      bot.SendMessage(channelID, "Cached Members: " + bot.members.GetArray().length)
    }
  }

})

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

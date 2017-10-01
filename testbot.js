var DisnodeLite = require("./index.js");
var config = require('./config');
var Argumentor = require("./args")
var bot = new DisnodeLite({
  key: config.key
});


bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})

bot.on("message",(msg)=>{
  if(msg.message[0] == '%'){
    var raw = JSON.stringify(Argumentor.ParseMessage(msg.message), null, 2);
    console.log(raw);
    bot.SendMessage(msg.channelID, "```json\n" + raw + "\n```");
  }
})

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

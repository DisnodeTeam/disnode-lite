var DisnodeLite = require("./index.js");

var bot = new DisnodeLite({key: process.env.discord_key});
bot.Connect();
bot.on("ready", ()=>{
  console.log("Ready!");
})
bot.on("message", (data)=>{
  console.log(data.content);
})


bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

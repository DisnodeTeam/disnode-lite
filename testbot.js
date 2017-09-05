var DisnodeLite = require("./index.js");

var bot = new DisnodeLite({key: "MjYzMzMwMzY5NDA5OTA4NzM2.DHitPg.8IoxMGTSiOUmsbq8-v0fIwrvZ_8"});

var arrayTest = ["test", "test2", "test3"]

bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})

bot.on("message", (data)=>{
  if(data.content.includes("*test")){
    console.dir(bot.guilds.Get(data.guildID))
  }
})

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

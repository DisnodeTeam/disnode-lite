var DisnodeLite = require("./index.js");
var config = require('./config');
var extra = require("disnode-extra");
var bot = new DisnodeLite({
  key: config.key
});
console.log(extra);

bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})
var commander = new extra.Args(bot, "%");
commander.on("message", (args) =>{
  var raw = JSON.stringify(args, null, 2);
  console.log(raw);
  bot.SendMessage(args.msg.channelID, "```json\n" + raw + "\n```");
});

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

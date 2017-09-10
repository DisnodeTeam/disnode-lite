# disnode-lite
A lightweight Discord NodeJS API build from the Disnode Lib. This library only contains the Discord API. For extras such as **server count uploading** **command parser** **youtube player** and more please see `disnode-extra`

# Docs
Documentation is avalible at https://lite.disnodeteam.com

# Example Bot

```javascript
var DisnodeLite = require("disnode-lite");

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
    cacheChannels: true,
    cacheMembers: true
  }
});


bot.Connect();

bot.on("ready", ()=>{
  console.log("Ready!");
})

bot.on("message",({message, channelID})=>{

})

bot.on("cache_bot_update", (data)=>{
  console.log(data);
})

```
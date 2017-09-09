Array.prototype.Get = function(id){
    for(var i=0;i<this.length;i++){
        if(this[i].id == id){
            return this[i];
        }
    }
}

Array.prototype.Set = function(id, val){
    for(var i=0;i<this.length;i++){
        if(this[i].id == id){
            this[i] = val;
        }
    }
}
class Cache {
    constructor(mode = "mem"){
        this.mode = mode;
        this.guilds = [];
        this.channels = [];
        this.members = [];

        this.BindGetFunction();
    }
    BindGetFunction(){
        var self = this;

        this.guilds.GetArray = function(){return this};
        this.channels.GetArray = function(){return this};  
        this.members.GetArray = function(){return this};
        
        
    }

    
    CacheGuildAdd(guild){
        if(!guild){return;}
        this.guilds.push(guild);
        this.AttemptChannelCache(guild.channels);
    }
    
    CacheGuildUpdate(guild){
        if(!guild){return;}
        console.log(guild.channels)
        var oldGuild = this.guilds.Set(guild.id, guild);
    }
    CacheGuildDelete(guild){
        if(!guild){
            return;
        }

        this.guilds.push(guild);

        console.log(guild)
    }

    CacheGuildMemberAdd(guild){

    }

    CacheGuildMemberRemoved(guild){

    }

    AttemptChannelCache(channel){
        var self = this;

        if(!channel){return;}
        if(this.mode !="mem"){return;}
        if(channel == typeof(Array)){
            channel.forEach(function(element) {
                self.channels.push(element);
            }, this);
        }else{
            this.channels.push(channel);
        }

    }


}

module.exports = Cache;
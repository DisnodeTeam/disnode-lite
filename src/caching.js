Array.prototype.Get = function (id) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].id == id) {
			return this[i];
		}
	}
}

Array.prototype.Set = function (id, val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].id == id) {
			this[i] = val;
		}
	}
}
class Cache {
	constructor(config = {}) {
		this.cacheChannels = config.cacheChannels || true;
		this.cacheMembers = config.cacheMembers || true;
		this.guilds = [];
		this.channels = [];
		this.members = [];

		this.BindGetFunction();
	}

	BindGetFunction() {
		var self = this;

		this.guilds.GetArray = function () { return this };

		this.channels.GetArray = function () {
			if (this.cacheChannels) { return this; }

			var allArray = [];
			for (var i = 0; i < self.guilds.length; i++) {
				allArray = allArray.concat(self.guilds[i].channels);

			}
			return allArray;
		};

		this.members.GetArray = function () {
			if (this.cacheMembers) { return this; }

			var allArray = [];
			for (var i = 0; i < self.guilds.length; i++) {
				allArray = allArray.concat(self.guilds[i].members);

			}
			return allArray;
		};

	}

	//*
	// CACHE FUNCTION
	//

	//Guilds
	
	CacheGuildAdd(guild) {
		if (!guild) { return; }
		this.guilds.push(guild);
		this.AttemptChannelCache(guild.channels);
		this.AttemptMemberCache(guild.members);
	}

	CacheGuildUpdate(guild) {
		if (!guild) { return; }
		var oldGuild = this.guilds.Set(guild.id, guild);
	}

	CacheGuildDelete(guild) {
		if (!guild) {
			return;
		}
	}

	//Channels

	CacheChannelAdd(channel){
		if(!this.cacheChannels){return;}
		this.AttemptChannelCache(channel);
	}

	CacheChannelUpdate(channel){
		if(!this.cacheChannels){return;}
		this.channels.Set(channel.id, channel);
	}

	CacheChannelRemove(channel){
		if(!this.cacheChannels){return;}
		var index = this.channels.indexOf(channel)
		this.channels.slice(index, 1);
	}

	// Members

	CacheGuildMemberAdd(member) {
		this.members.push(member);
	}

	CacheGuildMemberRemoved(member) {
		if(!this.cacheMembers){return;}
		var index = this.members.indexOf(member)
		this.members.slice(index, 1);
	}

	AttemptMemberCache(member) {
		var self = this;

		if (!member) { return; }

		if (!this.cacheMembers) { return; }

		if (Array.isArray(member)) {

			member.forEach(function (element) {
				
				var flattenedMember = {
					username: element.user.username,
					id: element.user.id,
					discriminator:element.user.discriminator,
					avatar: element.user.avatar,
					roles: element.roles,
					mute: element.mute,
					joined: element.join_at,
					dead: element.deaf
				}

				self.members.push(flattenedMember);
			}, this);
		} else {

			var flattenedMember = {
				username: member.user.username,
				id: member.user.id,
				discriminator:member.user.discriminator,
				avatar: member.user.avatar,
				roles: member.roles,
				mute: member.mute,
				joined: member.join_at,
				dead: member.deaf
			}
			this.members.push(member);
		}
	}

	AttemptChannelCache(channel) {
		var self = this;

		if (!channel) { return; }

		if (!this.cacheChannels) { return; }

		if (Array.isArray(channel)) {

			channel.forEach(function (element) {
				self.channels.push(element);
			}, this);
		} else {
			this.channels.push(channel);
		}

	}


}

module.exports = Cache;
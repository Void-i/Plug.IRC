cleanString = function(string){return string.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">")}

var socket = io.connect('<socket server>');
	socket.on('connect', function(){
		socket.on('joinFromIRC', function(who, channel){
			API.sendChat('/me ' + who + ' has joined ' + channel);
		});
		socket.on('leaveFromIRC', function(who, channel){
			API.sendChat('/me ' + who + ' has left ' + channel);
		});
		socket.on('tellRaw', function(message){
			API.sendChat(cleanString(message));
		})
		socket.on('messageFromIRC', function(from, text){
			API.sendChat(from + ': ' + text);
		});
		socket.on('nickFromIRC', function(oldNick, newNick){
			API.sendChat('/me ' + oldNick + ' is now known as ' + newNick);
		});
		socket.on('kickFromIRC', function(nick, channel, by){
			API.sendChat('/me ' + nick + ' was kicked from ' + channel + ' by ' + by);
		});
		socket.on('+modeChange', function(by, mode, argument){
			API.sendChat('/me ' + by + ' set ' + argument + ' to ' + mode);
		});
		socket.on('-modeChange', function(by, mode, argument){
			API.sendChat('/me ' + by + ' set ' + argument + ' to ' + mode);
		});
		API.on(API.USER_JOIN, function(user){
			socket.emit('joinFromPlug', user.username);
		});
		API.on(API.USER_LEAVE, function(user){
			socket.emit('leaveFromPlug', user.username);
		});
		API.on(API.CHAT, function(data){
			if(data.fromID != API.getUser().id) socket.emit('messageFromPlug', data.from, cleanString(data.message), data.type);
		});
	});

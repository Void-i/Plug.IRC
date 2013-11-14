var socket = io.connect('<socket server>');
	socket.on('connect', function(){
		socket.on('joinFromIRC', function(who, channel){
			API.sendChat('/me ' + who + ' has joined ' + channel);
		});
		socket.on('leaveFromIRC', function(who, channel){
			API.sendChat('/me ' + who + ' has left ' + channel);
		});
		socket.on('messageFromIRC', function(from, text){
			API.sendChat(from + ': ' + text);
		});
		socket.on('nickFromIRC', function(oldNick, newNick){
			API.sendChat('/me ' + oldNick + ' is now known as ' + newNick);
		});
		socket.on('kickFromIRC', function(nick, channel, by){
			API.sendChat('/me ' + nick + ' was kicked from ' + channel + ' by ' + by);
		});
		socket.on('requestUsers', function(){
			users = [];
			for(var i in API.getUsers()){
				if(API.getUsers()[i].username !== undefined) users.push(API.getUsers()[i].username);
			}
			socket.emit('sendUsers', users)
		})
		API.on(API.USER_JOIN, function(user){
			socket.emit('joinFromPlug', user.username);
		});
		API.on(API.USER_LEAVE, function(user){
			socket.emit('leaveFromPlug', user.username);
		});
		API.on(API.CHAT, function(data){
			if(data.fromID != API.getUser().id) socket.emit('messageFromPlug', data.from, _.unescape(data.message), data.type);
		});
	});

var irc = require('irc');
var io = require('socket.io').listen(1337);
var channel = '#plug_fim';
var autoOP = 'DerpTheBass';
var name = 'FIMBot'

var bot = new irc.Client('irc.freenode.net', name, { 
	channels : [channel],
	floodProtection: true,
	floodProtectionDelay: 2000,
	autoReconnect: true,
	autoRejoin: true,
	realName: 'Plug.IRC'
});

io.sockets.on('connection', function(socket) {
        bot.addListener('join', function(channel, who) {
            if (who !== name) socket.emit('joinFromIRC', who, channel);
            if (who === autoOP) bot.send('MODE', channel, '+o', autoOP);
        });
        bot.addListener('quit', function(who, reason, channel, message) {
            socket.emit('leaveFromIRC', who, channel);
        });
        bot.addListener('message', function(from, to, text, message) {
            if (text.indexOf('!x') !== 0 && text.indexOf('!tellraw') !== 0) socket.emit('messageFromIRC', from, text);
            else if (text.indexOf('!tellraw') === 0) socket.emit('tellRaw', text.substring(8));
        });
        bot.addListener('+mode', function(channel, by, mode, argument, message){
        	socket.emit('+modeChange', by, mode, argument);
        });
        bot.addListener('-mode', function(channel, by, mode, argument, message){
        	socket.emit('-modeChange', by, mode, argument);
        });
        bot.addListener('nick', function(oldNick, newNick) {
            socket.emit('nickFromIRC', oldNick, newNick);
        });
        bot.addListener('kick', function(channel, who, by, reason, message){
            socket.emit('kickFromIRC', who, channel, by);
        });
        bot.addListener('kill', function(who, reason, channel, message){
            socket.emit('leaveFromIRC', who, channel);
        });
        bot.addListener('part', function(chanel, who, reason, message){
            socket.emit('leaveFromIRC', who, channel);
        });
        socket.on('joinFromPlug', function(username) {
            bot.say(channel, username + ' joined the room');
        });
        socket.on('leaveFromPlug', function(username) {
            bot.say(channel, username + ' left the room');
        });
        socket.on('messageFromPlug', function(username, message, type){
            if (type === 'message') bot.say(channel, username + ': ' + message);
            else if (type === 'emote') bot.say(channel, '*' + username + message);
        });
});

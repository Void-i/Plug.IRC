###Plug.IRC

=

This is a bit of a side project I did, so now I can cross making and IRC bot off my bucket list. I know it's not the most optimal code so please don't complain to me about it like some people have.

You are free to use this, but <b>do not</b> upload it anywhere else and/or claim it as your own.

=

####How to use it:

Requirements: 

- A server running Node.JS
- socket.io module
- irc module
- An IRC channel
- Some knowlege of IRC, Javascript, and Node
- A Plug account to run it on

Steps:

1. Install irc `npm install irc`
2. Install socket.io `npm install socket.io`
3. Create a file on your server for the bot code
4. Copy the code from Server.js into the file you've just made
5. Configure the IRC settings in Server.js
6. Start up the server `node server.js`
7. Copy the code from Client.js
8. Configure Client.js so that <socket server> is replaced with the address and port of your server
9. Paste Client.js into your browser's console

=
####Notes:

This isn't meant to be some professional IRC bot, I made it because I was bored.

If you have any trouble running it you can add me on skype: jjrambo97

I'll probably update it a bit within a few days of making this repo but after that, it will probably become dormant

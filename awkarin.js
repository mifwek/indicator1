const Discord = require("discord.js");
const bot = new Discord.Client();

const prefix = 'm='

bot.on('message', message => {
	
	let msg = message.content.toUpperCase();
	let sender = message.author;
	let cont = message.content.slice(prefix.length).split(" ");
	let arg = cont.slice(1);
	
	if (msg === prefix + 'ping') {
		message.channel.send('pong');
	}
	
});

bot.on('ready', () => {
	console.log('BOT SUDAH SIAP!');
});

bot.login(process.env.TOKEN);

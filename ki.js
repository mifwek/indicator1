const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
	console.log('aku siap');
});

bot.on("message", async (message) => {
	if (message.content.startsWith('ping!')) {
		message.channel.send("pong!");
	}
});

bot.login(process.env.TOKEN);

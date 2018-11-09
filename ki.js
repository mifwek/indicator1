const Discord = require("discord.js");
const bot = new Discord.Client({enableEveryone: true}, {enableTextChannel: true});
const PREFIX = "m=";
const figlet = require("figlet");

bot.on("ready", function() {
    bot.user.setGame(`Discord!`);
    console.log(`${bot.user.username} is Ready!`);
});

bot.on('guildMemberAdd', async (member) => {
	const joinchannel = member.guild.channels.find('name', 'welcomer_goodbye');
    joinchannel.send(`SELAMAT DATANG ${member.user.tag}!`);

});

bot.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

    if (cmd === `${prefix}help`) {
        var embedhelpmember = new Discord.RichEmbed()
            .setTitle("__**📁COMMAND LIST**__")
            .addField(" - serverinfo", "`m=serverinfo`")
            .addField(" - botinfo", "`m=botinfo`")
            .addField(" - userinfo", "`m=userinfo @mention`")
            .addField(" - avatar", "`m=avatar @mention`")
            .addField(" - unik", "`m=unik halo`")
            .addField(" - judi", "`m=judi`")
            .addField(" - ping", "`m=ping`")
            .addField(" - kuis", "`m=kuis`")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2018 Indicator_Squad Bot.");
            message.channel.send(embedhelpmember)
    };

	if (cmd === `${prefix}botinfo`) {
		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setTitle("Informasi Bot")
		.setColor("RANDOM")
		.setThumbnail(bicon)
		.addField("Nama Bot", bot.user.username)
		.addField("Dibuat", bot.user.createdAt);
		message.channel.send(botembed);
	}

    if (cmd === `${prefix}kuis`) {
       const quiz = [
           { q: "Pak RT bisa terbang, Pak RT punya?", a: ["tiket"] }, 
           { q: "Mobil Tidak Bisa Jalan Maju, Sebab?", a: ["parkir"] },
           { q: "Bola apa yang mirip kucing?", a: ["bolaemon"] },
           { q: "Nenek nenek kecebur sumur muncul dimana?", a: ["diberita"] },
           { q: "Bangun Tidur Ku Terus?", a: ["melek"] },
         ];

       const options = { 
           max: 1,
           time: 10050,
           errors: ["time"],
     };

       const item = quiz[Math.floor(Math.random() * quiz.length)];
           await message.channel.send(item.q);

       try {

       const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
       const winnerMessage = collected.first();

       return message.channel.send({embed: new Discord.RichEmbed()
           .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
           .setFooter("Mantap, Wkwkwkwkw")
           .setColor(message.guild.me.displayHexColor)

     })

     } catch (_) {

           return message.channel.send({embed: new Discord.RichEmbed()
           .setAuthor('Jawaban kamu salah')
           .setTitle(`Jawabannya: \`${item.a}\``)
           .setFooter("L.O.L, Wkwkwkwkwkw")

         })
      }
      message.delete().catch();
    }

	if (cmd === `${prefix}serverinfo`) {
		let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		.setTitle("Informasi Server")
		.setColor("RANDOM")
		.setThumbnail(sicon)
		.addField("Nama Server", message.guild.name)
		.addField("ID", message.guild.id)
		.addField("Member", message.guild.memberCount)
		.addField("Negara", message.guild.region)
		.addField("Dibuat", message.guild.createdAt)
		.addField("Owner", message.guild.owner)

		message.channel.send(serverembed);
	}

	if (cmd === `${prefix}say`) {
		let say = args.join(" ");
    if(!say) return message.reply("masukan sebuah kata atau kalimat");
          message.delete().catch(O_o=>{}); 
          message.channel.send(say);
    }
    if (cmd === `${prefix}unik`) {
    		if (!args.join(' ')) return message.channel.send('harap berikan teks');
    		figlet(args.join(' '), (err, data) => {
    			message.channel.send(data, {
    				code: 'ascii'
    			});
    		});
    	};
    	
    if (cmd === `${prefix}avatar`) {
    	let user = message.mentions.users.first() || message.author;
        let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}'s Avatar`)
        .setImage(user.displayAvatarURL)
        .setColor('RANDOM')
        message.channel.send(embed)
        
    };

    if (cmd === `${prefix}userinfo`) {
    	let user = message.mentions.users.first() || message.author;
        let embed = new Discord.RichEmbed()
        .setAuthor(`${user.tag}'s Info`, user.displayAvatarURL)
        .setThumbnail(user.displayAvatarURL)
        .setColor('RANDOM')
        .addField('ID', user.id, true)
        .addField('Username', user.username, true)
        .addField('Discrim', user.discriminator, true)
        .addField('Status', user.presence.status, true)
        .addField('Bot?', user.bot, true)
        .setThumbnail()
        message.channel.send(embed)
    };

    if (cmd === `${prefix}hapus`) {
    	if(isNaN(args[0])) return message.channel.send('Harap berikan jumlah yang valid untuk membersihkan atau menghapus pesan!');
        if (args[0] > 100) return message.channel.send('Berikan jumlah kurang dari 100!');
        message.channel.bulkDelete(args[0])

    };

    if (cmd === `${prefix}judi`) {
       const slots = ['🍇', '🍊', '🍐'];
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
	if (slotOne === slotTwo && slotOne === slotThree) {
			return message.reply(`
				
				${slotOne}     |     ${slotTwo}     |     ${slotThree}
				
 Kamu Menang, lu hoki cuk haha!
		    `);
		}
		return message.reply(`
			    
			    ${slotOne}     |     ${slotTwo}     |     ${slotThree}
			    
 Kamu kalah!... Wkwkwkwkw!
		    `);
	    }

    if (cmd === `${prefix}ping`) {
        let start = Date.now(); message.channel.send(':ping_pong:').then(message => { 
        message.delete();
        let diff = (Date.now() - start); 
        let API = (bot.ping).toFixed(2)
        let embed = new Discord.RichEmbed()
        .setTitle(':ping_pong: Pong!')
        .setColor('RANDOM')
        .addField("Latency", `${diff}ms`, true)
        .addField("API", `${API}ms`, true)
        message.channel.send(embed);
    });
 
    }

});

bot.login(process.env.BOT_TOKEN);
    

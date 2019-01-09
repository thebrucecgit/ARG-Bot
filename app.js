const Discord = require("discord.js"),
btoa = require("btoa"),
encodeUrl = require("encodeurl"),
atob = require("atob"),
base32 = require("thirty-two"),
morse = require("morse");

const token = <BOT TOKEN> ; // Client Token
const client = new Discord.Client();

client.on('message', msg => {
    var msgContent = msg.content;
    var command = msgContent.split(" ", 1)[0].toLowerCase();
    var content = msgContent.substring(6);
    var output;
    var commandName;
    var link = false; // To determine if output is a link
    switch(command) {
	case "!help":  // Help Menu
    		const embed = new Discord.RichEmbed()
        		.setTitle("List of Commands")
        		.addField('!b64e or !b64d', 'Base 64 Encoding or Decoding', true)
        		.addField('!b32e or !b32d', 'Base32 Encoding or Decoding', true)
        		.addField('!MoEn or !MoDe', 'Morse Code Encoding or Decoding', true)
        		.addField('!biEn or biDe', 'Binary Encoding or Decoding', true)
        		.addField('!ASCI or !ASCT', 'Text to ASCII Decimal or vice versa', true)
        		.addField('!Anag', 'Finding English Anagrams', true)
        		.setColor('#2976f2');
   		 msg.channel.send(embed);
		 break;
	case "!b64e":  // Base64 Encoding
	        commandName = "Base64 Encoding";
		output = btoa(content);
		break;
	case "!b64d":  // Base64 Decoding
	        commandName = "Base64 Decoding";
	        output = atob(content);
		break;
	case "!b32e":  // Base32 Encoding
	        commandName = "Base32 Encoding";
	        output = base32.encode(content);
		break;
	case "!b32d":  // Base32 Decoding
	        commandName = "Base32 Decoding";
	        output = base32.decode(content);
		break;
	case "!moen":  // Morse Encoding MoEn
	        commandName = "Morse Encoding";
	        output = morse.encode(content);
		break;
	case "!mode":  // Morse Decoding MoDe
	        commandName = "Morse Decoding";
	        output = morse.decode(content);
		break;
	case "!anag":  // Anagrams Anag
	        commandName = "Finding Anagrams";
	        link = true;
	        output = encodeUrl("https://anagram-solver.net/" + content);
		break;
	case "!asci":  // Text to ASCII Decimal Value ASCI
	        commandName = "Text to ASCII Decimal Value";
	        var arr = content.split("");
	        var hexArr = [];
	        for (var i = 0; i < arr.length; i++) {
	            hexArr.push(arr[i].charCodeAt(0));
	        }
	        output = hexArr.join(" ");
		break;
	case "!asct":  // ASCII Decimal to Text
	        commandName = "Text to ASCII Decimal Value";
	        var arr = content.split(" ");
	        var hexArr = [];
	        for (var i = 0; i < arr.length; i++) {
	            hexArr.push(String.fromCharCode(arr[i]));
	        }
	        output = hexArr.join("");
		break;
	case "!bien":  // Binary Encoding biEn
	        commandName = "Binary Encoding";
	        output = content.trim()
	        .split("")
	        .map(item => ("0000000" + item.charCodeAt().toString(2))
	        .split("").slice(-8).join(""))
	        .join(" ");
		break;
	case "!bide":  // Binary Decoding biDe
	        commandName = "Binary Decoding";
	        output = content.trim().split(" ")
	        .map(item => String.fromCharCode(parseInt(item, 2)))
	        .join("");
	   	break;
    }

    if (output != undefined && link === false) {
        msg.channel.send("**" + commandName + "** for " + `${msg.author}`);
        msg.channel.send("```" + output + "```");
    } else if (output != undefined && link === true) { // if output is a link
        msg.channel.send("**" + commandName + "** for " + `${msg.author}`);
        msg.channel.send(output);
    }
});

client.on("ready", () => {
    console.log("Bot is connected");
    // client.channels.find(x => x.name === "bot-channel").send("Hello! I\'m now connected");
});

client.login(token);

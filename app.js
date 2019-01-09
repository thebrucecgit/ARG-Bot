const Discord = require("discord.js"),
btoa = require("btoa"),
encodeUrl = require("encodeurl"),
atob = require("atob"),
base32 = require("thirty-two"),
morse = require("morse"),
request = require("request");

const token = require("./token.json").token; // Token
const client = new Discord.Client();

client.on('message', msg => {
	console.log(msg.content);
    var msgContent = msg.content.split(" ");
    var command, content;
    if (msgContent[0].substring(0, 1) === "!") {
        command = msgContent[0].substring(1).toLowerCase();
        content = msgContent.slice(1);
        content = content.join(" ");
    }
    var output;
    var commandName;
    switch(command) {
	case "help":  // Help Menu
        const embed = new Discord.RichEmbed()
            .setTitle("List of Commands")
            .addField('!b64en or !b64de', 'Base 64 Encoding or Decoding', true)
        	.addField('!b32en or !b32de', 'Base32 Encoding or Decoding', true)
        	.addField('!MoEn or !MoDe', 'Morse Code Encoding or Decoding', true)
        	.addField('!binEn or binDe', 'Binary Encoding or Decoding', true)
        	.addField('!ASCIIEn or !ASCIIDe', 'Text to ASCII Decimal or vice versa', true)
        	.addField('!Anag', 'Finding English Anagrams', true)
        	.setColor('#2976f2');
   		 msg.channel.send(embed);
		 break;
	case "b64en":
	case "base64en": // Base64 Encoding
	    commandName = "Base64 Encoding";
		output = btoa(content);
		break;
	case "b64de":  
	case "base64de": // Base64 Decoding
	    commandName = "Base64 Decoding";
	    output = atob(content);
		break;
	case "b32en":  
	case "base32en": // Base32 Encoding
	    commandName = "Base32 Encoding";
	    output = base32.encode(content);
		break;
	case "b32de":  
	case "base32de": // Base32 Decoding
	    commandName = "Base32 Decoding";
	    output = base32.decode(content);
		break;
	case "moen":  
	case "morseen": // Morse Encoding MoEn
	    commandName = "Morse Encoding";
	    output = morse.encode(content);
		break;
	case "mode":  
	case "morsede": // Morse Decoding MoDe
	    commandName = "Morse Decoding";
	    output = morse.decode(content);
		break;
	case "anag":  // Anagrams Anag
		request(encodeUrl("http://anagramica.com/all/" + content), function(err, res, body){
			if (err) {
				console.log(err); 
			} else {
				var anagrams = JSON.parse(body).all.join(", \n");
				output = anagrams;
			}
		});
		commandName = "Anagrams";
		break;
	case "asciien":  // Text to ASCII Decimal Value ASCI
	    commandName = "Text to ASCII Decimal Value";
	    var arr = content.split("");
	    var hexArr = [];
	    for (let i = 0; i < arr.length; i++) {
	        hexArr.push(arr[i].charCodeAt(0));
	    }
	    output = hexArr.join(" ");
		break;
	case "asciide":  // ASCII Decimal to Text
	    commandName = "Text to ASCII Decimal Value";
	    var arr = content.split(" ");
	    var hexArr = [];
	    for (let i = 0; i < arr.length; i++) {
	        hexArr.push(String.fromCharCode(arr[i]));
	    }
	    output = hexArr.join("");
		break;
	case "binen":  // Binary Encoding biEn
	    commandName = "Binary Encoding";
	    output = content.trim()
	    .split("")
	    .map(item => ("0000000" + item.charCodeAt().toString(2))
	    .split("").slice(-8).join(""))
	    .join(" ");
		break;
	case "binde":  // Binary Decoding biDe
	    commandName = "Binary Decoding";
	    output = content.trim().split(" ")
	    .map(item => String.fromCharCode(parseInt(item, 2)))
	    .join("");
	   	break;
    }
    function returnOutput(){
		msg.channel.send("**" + commandName + "** for " + `${msg.author}` + "```" + output + "```");
    }
	if (command && command !== "anag" && command !== "help"){ // For Commands other than Anagram and Help
		returnOutput();
	} else if (command === "anag") {  // For Anagrams Command
		setTimeout(function(){returnOutput()}, 1500);
	}
});

client.on("ready", () => {
    console.log("Bot is connected");
    // client.channels.find(x => x.name === "bot-channel").send("Message from Dev: !Anag is unusable right now. Sorry");
});

client.login(token);
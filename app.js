const Discord = require("discord.js"),
btoa = require("btoa"),
encodeUrl = require("encodeurl"),
atob = require("atob"),
base32 = require("thirty-two"),
morse = require("morse"),
fs = require("fs");

const token = require('./betatoken.json').token; // Client Token
const client = new Discord.Client();
const commands = {};

fs.readdir("./cmds", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;

    const command = require(`./cmds/${file}`);

    for (var i = 0; i < command.hits.length; i++) {
      commands[command.hits[i]] = command.handler;
    }
  });
  console.log(`Commands loaded.`);
});
client.on('message', msg => {
    var msgContent = msg.content.split(" ");
    var command, content;
    if (msgContent[0].substring(0, 1) === "!") {
        command = msgContent[0].substring(1).toLowerCase();
        content = msgContent.slice(1);
        content = content.join(" ");
    }
    var output;
    var commandName;

    if (commands[command]) {
      const result = commands[command](msg, content);
      if (!result) return;
      if (result.output) output = result.output;
      if (result.commandName) commandName = result.commandName;
    }
	function returnOutput(){
		msg.channel.send("**" + commandName + "** for " + `${msg.author}` + "```" + output + "```");
	}
    if (command && output != undefined){ // For Commands other than Anagram
    	returnOutput();
    } else if (command === "anag") { //anag doesn't work
		setTimeout(function(){returnOutput()}, 1500);
    }
});
client.on("ready", () => {
    console.log("Bot is connected");
    // client.channels.find(x => x.name === "bot-channel").send("Hello! I\'m now connected");
});

client.login(token);

const Discord = require("discord.js"),
  fs = require("fs"),
  config = require('./config.json'),
  token = require('./token.json').token,
  client = new Discord.Client(),
  DBL = require("dblapi.js"),
  dbl = new DBL(require("./token.json").dbapikey, client),
  commands = {},
  msgLoader = require('./src/msg.js');

/* Command Loader
 * Any problems: See dathsheep.
 */
 // Loads all the files in 'cmds/'
fs.readdir("./cmds", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If file is not a JS file skip.
    if (!file.endsWith(".js")) return;
    // Loads the command into memory.
    const command = require(`./cmds/${file}`);
    // Loops through all of the words that will trigger the command.
    for (var i = 0; i < command.hits.length; i++) {
      // Adds them to the command object, with the triggering word..
      // as the key that to the object. The object is the function..
      // that handles the command.
      commands[command.hits[i]] = command.handler;
    }
  });
  console.log(`Commands loaded.`);
});
client.on('message', msg => {
  // Loads additions.
  msgLoader.load(msg);
  // Command Parsing
  let msgContent = msg.content.split(" ");
  let command, content;
  if (msgContent[0].substring(0, 1) === "!") {
    command = msgContent[0].substring(1).toLowerCase();
    content = msgContent.slice(1);
    content = content.join(" ");
  }
  let output,
    commandName,
    result;
  // If the command is in the commands object:
	if (commands[command]) {
    // Fires the function associated to the command.
		result = commands[command](msg, content, client);
    // If the command returns anything, bot replies with results.
		if (!result) return;
		if (result.output) output = result.output;
		if (result.commandName) commandName = result.commandName;
	}
    if (command && output != undefined){
    	msg.returnOutput(msg, result);
    }
});
client.on("ready", () => {
    console.log("Bot is connected");
    client.user.setActivity(config.bot.statusMessage, {type: "WATCHING"});
});

client.login(token);

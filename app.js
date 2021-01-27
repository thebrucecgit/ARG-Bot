require('dotenv').config();
const Discord = require("discord.js"),
  fs = require("fs"),
  config = require('./config.json'),
  token = process.env.TOKEN,
  client = new Discord.Client(),
  DBL = require("dblapi.js"),
  dbl = new DBL(process.env.dbapikey, client),
  msgLoader = require('./src/msg.js'),
  nanoid = require('nanoid');

const commands = {};
const perms = {};

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
      if (file.startsWith("dev")) perms[command.hits[i]] = "dev";
      else if (file.startsWith("admin")) perms[command.hits[i]] = "admin";
      else perms[command.hits[i]] = "all";
      commands[command.hits[i]] = command.handler;
    }
  });
  console.log(`Commands loaded.`);
});

client.on('message', msg => {
  if (msg.author.bot) return;
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
    try {
      if (perms[command] == "all" || perms[command] == "dev" && (msg.authorIsAdmin || msg.authorIsDev) || perms[command] == "admin" && msg.authorIsAdmin)
        result = commands[command](msg, content, client);
      else
        throw new Error(`Insufficient permissions. You need to be ${perms[command]}.`);
    } catch (e) {
      const id = nanoid(7);
      console.log('Error: ID:' + id + ' ' + e.message);
      console.log('ID: ' + id + ' | ' + msg.content)
      console.error(e);
      return msg.channel.send(new Discord.RichEmbed()
        .setTitle('Error')
        .setColor('#FF0000')
        .setDescription('An error has occured while executing your command. Please notify our support server ASAP of how this error occured.')
        .addField('Message', e.message)
        .addField('Support Server', 'https://discord.gg/uDNJGxQ')
      )
    }
    // If the command returns anything, bot replies with results.
		if (!result) return;
		if (result.output) output = result.output;
		if (result.commandName) commandName = result.commandName;
  }
  
  if (command && output != undefined) msg.returnOutput(msg, result);
});

client.on("ready", () => {
  console.log("Bot is connected");
  client.user.setActivity(config.bot.statusMessage, {type: "WATCHING"});
});

client.login(token);

require('dotenv').config();
const { Client, MessageEmbed, Message } = require("discord.js");
const token = process.env.TOKEN;
const config = require('./config.json');

const UserError = require("./src/UserError");
const fs = require("fs");
const nanoid = require('nanoid');
const DBL = require("dblapi.js");

const client = new Client();
// const dbl = new DBL(process.env.dbapikey, client);
const keys = new Map();
const commands = [];

// Command Loader for all files in './cmds'
fs.readdir("./cmds", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file, ind) => {
    // If file is not a JS file skip.
    if (!file.endsWith(".js")) return;
    // Loads the command into memory.
    commands[ind] = require(`./cmds/${file}`);
    commands[ind].file = file;

    // Setup perms 
    if (file.startsWith("dev")) commands[ind].perm = "dev";
    else if (file.startsWith("admin")) commands[ind].perm = "admin";
    else commands[ind].perm = "all";

    // Loops through all of the words that will trigger the command.
    for (const hit of commands[ind].hits) {
      // Adds command id to keys map with `hit` as the key
      keys.set(hit, ind);
    }
  });
  console.log("Commands loaded.");
});

client.on('message', async (msg) => {
  // Return if bot
  if (msg.author.bot) return;
  // // Loads additions.
  // msgLoader.load(msg);

  // Don't respond to public in non-prod mode
  if (process.env.NODE_ENV !== "production" && !config.admins.includes(msg.author.id)) return;

  // Command Parsing
  let msgContent = msg.content.split(" ");
  if (msgContent[0].substring(0, 1) !== "!") return;
  const commandHit = msgContent[0].substring(1).toLowerCase();
  const content = msgContent.slice(1).join(" ").trim();

  // Return if the command does not exist
  if (!keys.has(commandHit)) return;

  // Fires the function associated to the command.
  try {
    const command = commands[keys.get(commandHit)];
    if (command.perm === "admin" && !config.admins.includes(msg.author.id))
      throw new UserError(`Insufficient permissions. You need to be a(n) ${command.perm}.`);
    
    const output = await command.handler(content, client, msg);
    if (!output.hexColor) output.setColor(config.bot.embedColor)
    if (!output.title) output.setTitle(command.name);
    msg.channel.send(output);
  } catch (e) {
    if (e instanceof UserError)
      return msg.channel.send(new MessageEmbed()
        .setTitle("User Error")
        .setColor("#FF7900")
        .setDescription("Invalid command — something went wrong. See !help for list of valid commands.")
        .addField("Message", e.message)
        .addField("Support Server", "https://discord.gg/uDNJGxQ")
      );

    const id = nanoid(7);
    console.log('Error: ID:' + id + ' ' + e.message);
    console.log('ID: ' + id + ' | ' + msg.content)
    console.error(e);
    return msg.channel.send(new MessageEmbed()
      .setTitle('Server Error')
      .setColor('#FF0000')
      .setDescription('An error has occurred on the server while executing your command. Please notify our support server ASAP of how this error occurred.')
      .addField('Message', e.message)
      .addField('Support Server', 'https://discord.gg/uDNJGxQ')
    );
  }
});

client.on("ready", () => {
  console.log("Bot is connected");
  client.user.setActivity(config.bot.statusMessage, {type: "WATCHING"});
});

client.login(token);

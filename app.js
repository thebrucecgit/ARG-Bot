require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { TOKEN } = process.env;
const config = require("./config.json");

const UserError = require("./src/UserError");
const commandsExecuted = require("./src/commandsExecuted");
const fs = require("fs");
const DefaultErrorMessage = require("./src/DefaultErrorMessage");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  commandsExecuted.increment();
  try {
    const command = commands[keys.get(interaction.commandName)];
    await command.handler(interaction, client);
  } catch (e) {
    try {
      let error = e;
      if (!(error instanceof UserError)) {
        console.error(e);
        error = new DefaultErrorMessage(e);
      }
      if (interaction.deferred)
        await interaction.editReply({ embeds: [error] });
      else await interaction.reply({ embeds: [error] });
    } catch (e) {}
  }
});

client.on("ready", () => {
  console.log("Bot is connected");
  client.user.setActivity(config.bot.statusMessage, { type: "WATCHING" });
});

client.login(TOKEN);

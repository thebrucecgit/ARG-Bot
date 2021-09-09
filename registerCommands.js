require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const { TOKEN, CLIENT_ID } = process.env;

const commands = [];
const commandFiles = fs
  .readdirSync("./cmds")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  commands.push(command.cmd.toJSON());
}

console.log(commands.map((cmd) => cmd.name));

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

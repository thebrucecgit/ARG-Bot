const version = require("../package.json").version;
const { SlashCommandBuilder } = require("@discordjs/builders");
const MessageEmbed = require("../src/MessageEmbed");
const commandsExecuted = require("../src/commandsExecuted");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Fetches bot stats across guilds"),
  hits: ["stats", "info"],
  name: "Statistics",
  handler: async (interaction, client) => {
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Statistics")
          .setDescription(`ARG-Bot v${version}`)
          .addField("Users", client.users.cache.size.toString(), true)
          .addField("Channels", client.channels.cache.size.toString(), true)
          .addField("Guilds", client.guilds.cache.size.toString(), true)
          .addField("Commands executed", commandsExecuted.num.toString(), true)
          .addField("Uptime", uptime(client)),
      ],
    });
  },
};
function uptime(client) {
  let totalSeconds = Math.floor(client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

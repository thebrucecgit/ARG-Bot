const version = require("../package.json").version;
const { MessageEmbed } = require("discord.js");
const commandsExecuted = require('../src/commandsExecuted');
module.exports = {
  hits: ['stats', "info"],
  name: "Statistics",
  handler: (content, client) => {
    return new MessageEmbed()
      .setDescription(`ARG-Bot v${version}`)
      .addField("Users", client.users.cache.size, true)
      .addField("Channels", client.channels.cache.size, true)
      .addField("Guilds", client.guilds.cache.size, true)
      .addField("Commands executed", commandsExecuted.num, true)
      .addField("Uptime", uptime(client));
  }
};
function uptime(client) {
  let totalSeconds = Math.floor(client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return(`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`);
}

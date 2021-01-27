const version = require("../package.json").version;
const { MessageEmbed } = require("discord.js");
module.exports = {
  hits: ['stats', "info"],
  name: "Statistics",
  handler: (content, client) => {
    return new MessageEmbed()
      .setDescription(`ARG-Bot v${version}`)
      .addField("Users", Object.keys(client.users).length, true)
      .addField("Channels", Object.keys(client.channels).length, true)
      .addField("Guilds", Object.keys(client.guilds).length, true)
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

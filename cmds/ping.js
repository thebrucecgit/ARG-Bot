const { MessageEmbed } = require("discord.js");
module.exports = {
  hits: ['ping', 'pong'],
  name: "Ping",
  handler: (content, client, msg) => {
    return new MessageEmbed().setDescription(`The bot is online. ${new Date() - msg.createdAt}ms`);
  },
};

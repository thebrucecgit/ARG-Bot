const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = class BaseMessageEmbed extends MessageEmbed {
  constructor() {
    super();
    this.setColor(config.bot.embedColor);
  }
};

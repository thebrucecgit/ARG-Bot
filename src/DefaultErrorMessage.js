const { MessageEmbed } = require("discord.js");

module.exports = class DefaultErrorMessage extends MessageEmbed {
  constructor(e) {
    super();
    this.setTitle("Server Error")
      .setColor("#FF0000")
      .setDescription(
        "An error has occurred on the server while executing your command. Please notify our support server ASAP of how this error occurred."
      )
      .addField("Message", e.message)
      .addField("Support Server", "https://discord.gg/uDNJGxQ");
  }
};

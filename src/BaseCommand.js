const { MessageEmbed } = require("discord.js");
const UserError = require("./UserError");
class BaseCommand extends MessageEmbed {
  constructor(input, output) {
    if (!input) throw new UserError("Missing input");
    if (!output) output = "\u200b";
    super();
    this.addField("Input", `\`${input}\``);
    this.addField("Output", `\`${output}\``);
  }
}

module.exports = BaseCommand;
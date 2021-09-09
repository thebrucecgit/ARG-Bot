const MessageEmbed = require("./MessageEmbed");
const UserError = require("./UserError");
class BaseCommand extends MessageEmbed {
  constructor(input, output) {
    super();
    if (!input) throw new UserError("Missing input");
    if (!output) output = "\u200b";
    this.addField("Input", `\`${input}\``);
    this.addField("Output", `\`${output}\``);
  }
}

module.exports = BaseCommand;

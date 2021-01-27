const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['binen', 'binaryencode'],
  name: "Binary Encoding",
  handler: (content) => {
    const output = content.trim()
      .split("")
      .map(item => ("0000000" + item.charCodeAt().toString(2))
      .split("").slice(-8).join(""))
      .join(" ");
    return new BaseCommand(content, output);
  }
};

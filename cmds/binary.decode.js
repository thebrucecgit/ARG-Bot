const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['binde', 'binarydecode'],
  name: "Binary Decoding",
  handler: (content) => {
    const output = content.split(" ")
      .map(item => String.fromCharCode(parseInt(item, 2)))
      .join("");
    return new BaseCommand(content, output);
  }
};

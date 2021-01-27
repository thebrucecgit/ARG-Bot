const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['asciien', 'asciiencode'],
  name: "Text to ASCII Decimal Value",
  handler: (content) => {
    return new BaseCommand(content, content.split("").map(x => x.charCodeAt(0)).join(" "));
  }
};

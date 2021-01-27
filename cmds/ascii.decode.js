const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['asciide', 'asciidecode'],
  name: "ASCII Decimal Value to Text",
  handler: (content) => new BaseCommand(content, content.split(" ").map(x => String.fromCharCode(x)).join("")),
};

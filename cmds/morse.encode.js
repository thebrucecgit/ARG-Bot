const BaseCommand = require("../src/BaseCommand");
const morse = require('morse');
module.exports = {
  hits: ['moen', 'morseen', 'morseencode'],
  name: "Morse Encoding",
  handler: (content) => new BaseCommand(content, morse.encode(content))
};

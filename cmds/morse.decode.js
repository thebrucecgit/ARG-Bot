const morse = require('morse');
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['mode', 'morsede', 'morsedecode'],
  name: "Morse Decoding",
  handler: (content) => new BaseCommand(content, morse.decode(content)),
};

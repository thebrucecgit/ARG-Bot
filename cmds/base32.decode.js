const base32 = require('thirty-two');
const BaseCommand = require('../src/BaseCommand');
module.exports = {
  hits: ['b32de', 'base32de', 'base32decode'],
  name: "Base32 Decoding",
  handler: (content) => new BaseCommand(content, base32.decode(content)),
};

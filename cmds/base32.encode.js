const base32 = require('thirty-two');
const BaseCommand = require('../src/BaseCommand');
module.exports = {
  hits: ['b32en', 'base32en', 'base32encode'],
  name: "Base32 Encoding",
  handler: (content) => new BaseCommand(content, base32.encode(content)),
};

const atob = require('atob');
const BaseCommand = require('../src/BaseCommand');
module.exports = {
  hits: ['b64de', 'base64de', 'base64decode'],
  name: "Base64 Decoding",
  handler: (content) => new BaseCommand(content, atob(content)),
};

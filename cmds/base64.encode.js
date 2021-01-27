const btoa = require('btoa');
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['b64en', 'base64en', 'base64encode'],
  name: "Base64 Encoding",
  handler: (content) => new BaseCommand(content, btoa(content))
};

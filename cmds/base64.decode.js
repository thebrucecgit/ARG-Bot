const atob = require('atob');
module.exports = {
  hits: ['b64de', 'base64de', 'base64decode'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Base64 Decoding";
    res.output = atob(content);
    res.input = content;
    return res;
  }
};

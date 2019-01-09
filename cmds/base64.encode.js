const btoa = require('btoa');
module.exports = {
  hits: ['b64en', 'base64en', 'base64encode'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Base64 Encoding";
    res.output = btoa(content);
    return res;
  }
};

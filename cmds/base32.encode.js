const base32 = require('thirty-two');
module.exports = {
  hits: ['b32en', 'base32en', 'base32encode'],
  handler: (msg, content) => {
    const res = {}
    res.commandName = "Base32 Encoding";
    res.output = base32.encode(content);
    return res;
  }
}

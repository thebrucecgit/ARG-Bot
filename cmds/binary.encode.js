const encodeUrl = require('encodeurl');
module.exports = {
  hits: ['binen', 'binaryencode'],
  handler: (msg, content) => {
    const res = {}
    res.commandName = "Binary Encoding";
    res.output = content.trim()
      .split("")
      .map(item => ("0000000" + item.charCodeAt().toString(2))
      .split("").slice(-8).join(""))
      .join(" ");
    return res;
  }
}

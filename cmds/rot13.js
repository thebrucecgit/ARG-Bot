const ebg13 = require('ebg13');
module.exports = {
  hits: ['rot13', 'rot'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Rot13";
    res.output = ebg13(content);
    return res;
  }
};

const morse = require('morse');
module.exports = {
  hits: ['mode', 'morsede', 'morsedecode'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Morse Decoding";
    res.output = morse.decode(content).replace('@', '!');
    res.input = content;
    return res;
  }
};

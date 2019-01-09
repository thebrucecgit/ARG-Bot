const morse = require('morse');
module.exports = {
  hits: ['moen', 'morseen', 'morseencode'],
  handler: (msg, content) => {
    const res = {}
    res.commandName = "Morse Encoding";
    res.output = morse.encode(content);
    return res;
  }
}

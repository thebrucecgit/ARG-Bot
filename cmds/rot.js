const rot = require('rot');
module.exports = {
  hits: ['rot', 'rotate'],
  handler: (msg, content) => {
    const res = {};
    let cypher = content.split(' ')[0] || 13;
    try {
      cypher = parseInt(cypher);
      if (Object.is(cypher, NaN)) throw new Error();
    } catch (e) {
      msg.channel.send('Not a valid number between 1-26.');
      return;
    }
    let text = content.split(' ')
    text.shift();
    text = text.join(' ')
    res.output = rot(text, cypher).replace('@', '!');
    res.commandName = `Rot${cypher} Cypher`
    res.input = text;
    return res;
  }
};

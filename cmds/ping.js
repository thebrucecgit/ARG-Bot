
module.exports = {
  hits: ['ping', 'pong'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = `Ping`,
    res.output = `If you are reading this the bot is online.`
    return res;
  }
};

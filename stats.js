module.exports = {
  hits: ['stats', 'statistics'],
  handler: (msg, content, client) => {
    const res = {};
    if (msg.member.id == 338543472099196928) {
        res.output = client.guilds;
    }
    res.commandName = "Statistics";
    return res;
  }
};

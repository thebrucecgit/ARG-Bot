const version = require("../package.json").version;
module.exports = {
  hits: ['stats', 'statistics'],
  handler: (msg, content, client) => {
    const res = {};
    function uptime() {
      let totalSeconds = Math.floor(client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return(`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`);
    }
    
    if (msg.member.id == 338543472099196928 || msg.member.id == 213928278497558528) {
        res.output = `ARG-Bot v${version} \nUsers: ${client.users.size} \nChannels: ${client.channels.size} \nGuilds: ${client.guilds.size} \nUptime: ${uptime()}`;
    }
    res.commandName = "Statistics";
    return res;
  }
};

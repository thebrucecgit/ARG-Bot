const config = require('../config.json')
const Discord = require('discord.js')
module.exports = {
  load: function(msg) {
    msg.authorIsAdmin = authorIsAdmin;
    msg.authorIsDev = authorIsDev;
    msg.returnOutput = returnOutput;
  }
}
function authorIsAdmin() {
  if (config.admins.includes(this.member.id)) return true;
  return false;
}
function authorIsDev() {
  if (config.devs.includes(this.member.id)) return true;
  return false;
}
function returnOutput(msg, result){
  this.channel.send(
  `\`${result.commandName}\`\n` +
  `\`\`\`` + result.output + `\`\`\`` +
  '**Requested by:** ' + msg.author)
}

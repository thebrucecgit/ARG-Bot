const config = require('../config.json')
const Discord = require('discord.js')
module.exports = {
  load: function(msg) {
    msg.commandStarted = (new Date()).getTime();
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
  const timeTaken = (new Date().getTime() - msg.commandStarted);
  let response = [
    '```xl',
    `"Type": "${result.commandName}"`,
    `"Output":`,
    `${result.output}`,
    `"Input"`,
    `${result.input || 'Not available'}`,
    `"Time Taken": "${timeTaken}ms"`,
    '```'
  ].join('\n')
  msg.channel.send(msg.author.toString())
  msg.channel.send(response)
}

const config = require('../config.json')
const Discord = require('discord.js')
module.exports = {
  load: (msg) => {
    msg.commandStarted = (new Date()).getTime();
    msg.authorIsAdmin = config.admins.includes(msg.author.id);
    msg.authorIsDev = config.devs.includes(msg.author.id);
    msg.returnOutput = returnOutput;
  }
}

function returnOutput(msg, result){
  const timeTaken = (new Date().getTime() - msg.commandStarted);
  let response = [
    '```xl',
    `"Type": ${result.commandName}`,
    `"Input"`,
    `${result.input || 'Not available'}`,
    `"Time Taken": "${timeTaken}ms"`,
    `"Output":`,
    `${result.output}`,
    '```'
  ].join('\n')
  msg.channel.send(msg.author.toString() + response);
}

const config = require('../config.json')
const Discord = require('discord.js')
module.exports = {
  load: function(msg) {
    msg.authorIsAdmin = authorIsAdmin;
    msg.returnOutput = returnOutput;
  }
}
function authorIsAdmin() {
  if (config.admins.includes(this.member.id)) return true;
  return false;
}
function returnOutput(msg, result){
  this.channel.send(new Discord.RichEmbed()
    .setTitle(result.commandName)
    .setAuthor('ARG Bot', this.client.user.avatarURL)
    .setFooter(`Requested by: ${this.author.username}#${this.author.discriminator}`)
    .setDescription(`\`\`\`${result.output}\`\`\``)
    .setTimestamp(new Date())
    .setColor(config.bot.embedColor)
  )
}

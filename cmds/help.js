const Discord = require("discord.js");
module.exports = {
  hits: ['help', 'commands', 'cmds'],
  handler: (msg, content) => {
    const embed = new Discord.RichEmbed()
      .setTitle("List of Commands")
      .addField('!b64en or !b64de', 'Base 64 Encoding or Decoding', true)
      .addField('!b32en or !b32de', 'Base32 Encoding or Decoding', true)
      .addField('!MoEn or !MoDe', 'Morse Code Encoding or Decoding', true)
      .addField('!binEn or binDe', 'Binary Encoding or Decoding', true)
      .addField('!ASCIIEn or !ASCIIDe', 'Text to ASCII Decimal or vice versa', true)
      .addField('!Atbash or !atb', 'At-bash Encode and Decode', true)
      .addField('!Rot13 or !Rot', 'Rot13 Encode and Decode', true)
      .addField('!Anag', 'Finding English Anagrams', true)
      .setColor('#2976f2');
    msg.channel.send(embed);
  }
};

const { MessageEmbed } = require("discord.js");
module.exports = {
  hits: ['help', 'commands', 'cmds'],
  name: "Help Menu",
  handler: () => new MessageEmbed()
    .addField('!b64en or !b64de', "Base 64 Encode or Decode", true)
    .addField('!b32en or !b32de', "Base32 Encode or Decode", true)
    .addField('!MoEn or !MoDe', "Morse Code Encode or Decode", true)
    .addField('!binEn or binDe', "Binary Encode or Decode", true)
    .addField('!ASCIIEn or !ASCIIDe', "ASCII Dec. Encode or Decode", true)
    .addField('!Atbash or !atb', "At-bash Encode and Decode", true)
    .addField('!Anag', "Finding English Anagrams", true)
    .addField('!Rot [1-26]', "Rotate a cypher w/ key", true)
    .addField('!RT or !RevText', "Reverse the text", true)
    .addField('!Uppercase or !upc', 'Return Uppercase Letters')
    .addField('!Wikipedia', "Search Wikipedia", true)
    .addField('!ping', "Pings Server", true)
    .addField("Private encoding/decoding", "Simply PM the bot", true)
    .addField("Support Server", "https://discord.gg/uDNJGxQ")
    .setFooter("https://thebrucecgit.github.io/ARG-Bot/")
    .setColor('#2976f2')
};

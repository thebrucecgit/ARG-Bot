const { SlashCommandBuilder } = require("@discordjs/builders");
const MessageEmbed = require("../src/MessageEmbed");
module.exports = {
  cmd: new SlashCommandBuilder().setName("help").setDescription("Help menu"),
  hits: ["help", "commands", "cmds"],
  name: "Help Menu",
  handler: async (interaction) => {
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .addField(
            "/base64encode or /base64decode",
            "Base 64 Encode or Decode",
            true
          )
          .addField(
            "/base32encode or /base32decode",
            "Base32 Encode or Decode",
            true
          )
          .addField(
            "/morseencode or /morsedecode",
            "Morse Code Encode or Decode",
            true
          )
          .addField(
            "/binaryencode or /binarydecode",
            "Binary Encode or Decode",
            true
          )
          .addField(
            "/asciiencode or /asciidecode",
            "ASCII Dec. Encode or Decode",
            true
          )
          .addField("/atbash", "At-bash Encode and Decode", true)
          .addField("/anagram", "Finding English Anagrams", true)
          .addField("/rotate", "Rotate a cipher w/ key", true)
          .addField("/reverse", "Reverse the text", true)
          .addField("/uppercase", "Return Uppercase Letters")
          .addField("/wikipedia", "Search Wikipedia", true)
          .addField("/ping", "Pings Server", true)
          .addField("Private encoding/decoding", "Simply PM the bot", true)
          .addField("Support Server", "https://discord.gg/uDNJGxQ")
          .setFooter("https://thebrucecgit.github.io/ARG-Bot/")
          .setColor("#2976f2"),
      ],
    });
  },
};

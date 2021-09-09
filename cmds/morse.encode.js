const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");
const morse = require("morse");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("morseencode")
    .setDescription("Encode morse code")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["moen", "morseen", "morseencode"],
  name: "Morse Encoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [
        new BaseCommand(input, morse.encode(input)).setTitle("Morse Encoding"),
      ],
    });
  },
};

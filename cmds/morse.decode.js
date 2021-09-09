const { SlashCommandBuilder } = require("@discordjs/builders");
const morse = require("morse-converter");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("morsedecode")
    .setDescription("Decode morse code")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["mode", "morsede", "morsedecode"],
  name: "Morse Decoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [
        new BaseCommand(input, morse.decode(input)).setTitle("Morse Decoding"),
      ],
    });
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const base32 = require("thirty-two");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("base32decode")
    .setDescription("Decode Base32")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["b32de", "base32de", "base32decode"],
  name: "Base32 Decoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [
        new BaseCommand(input, base32.decode(input)).setTitle(
          "Base32 Decoding"
        ),
      ],
    });
  },
};

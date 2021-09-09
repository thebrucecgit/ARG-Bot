const { SlashCommandBuilder } = require("@discordjs/builders");
const base32 = require("thirty-two");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("base32encode")
    .setDescription("Encode Base32")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["b32en", "base32en", "base32encode"],
  name: "Base32 Encoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [
        new BaseCommand(input, base32.encode(input)).setTitle(
          "Base32 Encoding"
        ),
      ],
    });
  },
};

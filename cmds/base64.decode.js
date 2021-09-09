const { SlashCommandBuilder } = require("@discordjs/builders");
const atob = require("atob");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("base64decode")
    .setDescription("Decode Base64")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["b64de", "base64de", "base64decode"],
  name: "Base64 Decoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [new BaseCommand(input, atob(input)).setTitle("Base64 Decoding")],
    });
  },
};

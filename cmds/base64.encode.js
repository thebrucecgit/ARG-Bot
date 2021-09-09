const { SlashCommandBuilder } = require("@discordjs/builders");
const btoa = require("btoa");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("base64encode")
    .setDescription("Encode Base64")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["b64en", "base64en", "base64encode"],
  name: "Base64 Encoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [new BaseCommand(input, btoa(input)).setTitle("Base64 Encoding")],
    });
  },
};

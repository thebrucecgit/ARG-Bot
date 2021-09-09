const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("binaryencode")
    .setDescription("Encode text to binary")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["binen", "binaryencode"],
  name: "Binary Encoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    const output = input
      .trim()
      .split("")
      .map((item) =>
        ("0000000" + item.charCodeAt().toString(2)).split("").slice(-8).join("")
      )
      .join(" ");
    await interaction.reply({
      embeds: [new BaseCommand(input, output).setTitle("Binary Encoding")],
    });
  },
};

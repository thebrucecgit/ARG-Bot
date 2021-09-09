const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("binarydecode")
    .setDescription("Decode binary to alphanumeric text")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["binde", "binarydecode"],
  name: "Binary Decoding",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    const output = input
      .split(" ")
      .map((item) => String.fromCharCode(parseInt(item, 2)))
      .join("");
    await interaction.reply({
      embeds: [new BaseCommand(input, output).setTitle("Binary Decoding")],
    });
  },
};

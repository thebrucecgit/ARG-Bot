const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("asciiencode")
    .setDescription("Encodes normal text to ASCII decimal value")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["asciien", "asciiencode"],
  name: "Text to ASCII Decimal Value",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    interaction.reply({
      embeds: [
        new BaseCommand(
          input,
          input
            .split("")
            .map((x) => x.charCodeAt(0))
            .join(" ")
        ).setTitle("Text to ASCII"),
      ],
    });
  },
};

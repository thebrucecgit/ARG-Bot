const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");

module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("asciidecode")
    .setDescription("Decodes ASCII decimal value to normal text")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["asciide", "asciidecode"],
  name: "ASCII Decimal Value to Text",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    await interaction.reply({
      embeds: [
        new BaseCommand(
          input,
          input
            .split(" ")
            .map((x) => String.fromCharCode(x))
            .join("")
        ).setTitle("ASCII to Text"),
      ],
    });
  },
};

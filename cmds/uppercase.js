const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");

module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("uppercase")
    .setDescription("Uppercase text")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["upc", "uppercase", "upcase"],
  name: "Uppercase Letters Only",
  async handler(interaction) {
    const input = interaction.options.getString("input");
    const output = [];
    const letters = /^[A-Za-z]+$/;
    for (let i = 0; i < input.length; i++) {
      if (input[i].match(letters) && input[i] === input[i].toUpperCase())
        output.push(input[i]);
    }
    await interaction.reply({
      embeds: [
        new BaseCommand(input, output.join("")).setTitle(
          "Uppercase Letters Only"
        ),
      ],
    });
  },
};

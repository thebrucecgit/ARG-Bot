const { SlashCommandBuilder } = require("@discordjs/builders");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("reverse")
    .setDescription("Reverse a string of text")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["reversetext", "revtext", "rt", "reverse"],
  name: "Reverse Text",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    const arr = input.split("");
    const newArr = new Array(arr.length);
    for (let i in arr) newArr[arr.length - i] = arr[i];
    await interaction.reply({
      embeds: [
        new BaseCommand(input, newArr.join("")).setTitle("Reverse Text"),
      ],
    });
  },
};

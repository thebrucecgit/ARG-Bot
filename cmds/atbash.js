const { SlashCommandBuilder } = require("@discordjs/builders");
const wiz = require("atbash-wizard");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("atbash")
    .setDescription("Atbash encoding and decoding")
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["atbash", "atb"],
  name: "Atbash",
  handler: async (interaction) => {
    const input = interaction.options.getString("input");
    const params = {
      word: input,
      simon: true,
    };
    let output;
    wiz.wizard(params, (err, data) => {
      if (err) throw err;
      else output = data;
    });
    await interaction.reply({
      embeds: [new BaseCommand(input, output).setTitle("Atbash")],
    });
  },
};

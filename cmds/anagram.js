const encodeUrl = require("encodeurl");
const { SlashCommandBuilder } = require("@discordjs/builders");
const UserError = require("../src/UserError");
const BaseCommand = require("../src/BaseCommand");

module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("anagram")
    .setDescription("Finds anagrams of a given word")
    .addStringOption((option) =>
      option.setName("word").setDescription("Input word").setRequired(true)
    ),
  hits: ["anag", "anagram", "nag-a-ram"],
  name: "Anagrams",
  handler: async (interaction) => {
    const input = interaction.options.getString("word");
    if (input.length > 10)
      throw new UserError("Sorry, your word is longer than 10 characters");

    if (!input.match(/^[A-Za-z]+$/))
      throw new UserError(
        "Please make sure you only enter English alphabet characters. No spaces allowed"
      );

    await interaction.deferReply();
    
    const { default: got } = (await import("got"));
    const response = JSON.parse(
      (await got(encodeUrl("http://anagramica.com/best/" + input))).body
    );
    if (typeof response.best[0] === "undefined")
      throw new UserError("No anagrams were found");

    const anagrams = response.best.slice(0, 8).join("\n");
    await interaction.editReply({
      embeds: [new BaseCommand(input, anagrams).setTitle("Anagrams")],
    });
  },
};

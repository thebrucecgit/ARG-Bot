const { SlashCommandBuilder } = require("@discordjs/builders");
const wikijs = require("wikijs").default;
const { MessageEmbed } = require("discord.js");
const UserError = require("../src/UserError");

module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("wikipedia")
    .setDescription("Search wikipedia on topic")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("Topic to search for")
        .setRequired(true)
    ),
  hits: ["wiki", "wikipedia", "search"],
  name: "Wikipedia",
  async handler(interaction) {
    const topic = interaction.options.getString("topic");

    await interaction.deferReply();

    try {
      const t1 = new Date().getTime();
      const info = await (await wikijs().page(topic)).summary();
      const link = `https://en.wikipedia.org/wiki/${topic.replaceAll(
        " ",
        "_"
      )}`;
      await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .addField("Input", topic)
            .addField("Synopsis", info.substr(0, 750) + "...")
            .setURL(link)
            .addField("Link", link)
            .addField("Time taken", `${new Date().getTime() - t1}ms`)
            .setTitle("Wikipedia Search"),
        ],
      });
    } catch (e) {
      throw new UserError(
        "Article not found or other error with Wikipedia API."
      );
    }
  },
};

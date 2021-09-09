const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  cmd: new SlashCommandBuilder().setName("ping").setDescription("Pings server"),
  hits: ["ping", "pong"],
  name: "Ping",
  async handler(interaction) {
    const sent = await interaction.deferReply({
      fetchReply: true,
    });
    await interaction.editReply(
      `Pong! Round trip latency: ${
        new Date(sent.timestamp) - new Date(interaction.createdAt)
      }ms`
    );
  },
};

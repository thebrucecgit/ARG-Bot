const { SlashCommandBuilder } = require("@discordjs/builders");
const rot = require("rot");
const BaseCommand = require("../src/BaseCommand");
module.exports = {
  cmd: new SlashCommandBuilder()
    .setName("rotate")
    .setDescription("Decode / encode rotational cipher")
    .addIntegerOption((option) =>
      option
        .setName("rotation")
        .setDescription("The number to rotate the cipher by")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("input").setDescription("Input text").setRequired(true)
    ),
  hits: ["rot", "rotate"],
  name: "Rotational Cipher",
  async handler(interaction) {
    const rotation = interaction.options.getInteger("rotation");
    const input = interaction.options.getString("input");

    let modulation = rotation % 26;
    if (modulation < 0) modulation += 26;

    await interaction.reply({
      embeds: [
        new BaseCommand(input, rot(input, modulation))
          .addField("Rotation", rotation.toString())
          .setTitle("Rotational Cipher"),
      ],
    });
  },
};

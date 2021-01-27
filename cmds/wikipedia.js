const wikijs = require("wikijs").default;
const { MessageEmbed } = require("discord.js");
const UserError = require("../src/UserError");

module.exports = {
  hits: ['wiki', 'wikipedia', 'search'],
  name: "Wikipedia",
  async handler (content) {
    if (!content) throw new UserError("Missing search parameter");
    try {
      const t1 = new Date().getTime();
      const info = await (await wikijs().page(content)).summary();
      return new MessageEmbed()
        .addField("Input", content)
        .addField('Synopsis', info.substr(0, 750) + '...')
        .setURL(`https://en.wikipedia.org/wiki/${content.split(' ').join('_')}`)
        .addField("Link", `https://en.wikipedia.org/wiki/${content.split(' ').join('_')}`)
        .addField("Time taken", `${new Date().getTime() - t1}ms`);
    } catch (e) {
      throw new UserError('Article not found or other error with Wikipedia API.');
    }
  }
};

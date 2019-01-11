const wikijs = require("wikijs").default,
  discord = require('discord.js'),
  config = require('../config.json');
module.exports = {
  hits: ['wiki', 'wikipedia', 'search'],
  handler: async (msg, content) => {
    if (!content) return;
    try {
      const info = await (await wikijs().page(content)).summary();
      msg.channel.send(new discord.RichEmbed()
        .setTitle('Wikipedia')
        .setDescription(info.substr(0, 750) + '...')
        .addField(`Link`, `https://en.wikipedia.org/wiki/${content.split(' ').join('_')}`)
        .setColor(config.bot.embedColor)
      )
    } catch (e) {
      msg.channel.send('Error: Article Not Found or Server Error.')
    }
  }
};

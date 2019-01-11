const encodeUrl = require('encodeurl'),
got = require("got");

module.exports = {
  hits: ['anag', 'anagram', 'nag-a-ram'],
  handler: (msg, content, client) => {
    const commandName = "Anagrams";
    (async () => {
      try {
          const response = await got(encodeUrl("http://anagramica.com/all/" + content));
  				var anagrams = JSON.parse(response.body).all.slice(0, 8).join(", \n");
  				const output = anagrams;
          msg.returnOutput(client, {
            commandName,
            output
          });
      } catch (error) {
          msg.reply(error.response.body);
          console.log(error.response.body);
      }
    })();
  }
};

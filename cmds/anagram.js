const encodeUrl = require('encodeurl'),
request = require("request");

module.exports = {
  hits: ['anag', 'anagram', 'nag-a-ram'],
  handler: (msg, content, client) => {
    const commandName = "Anagrams";
    request(encodeUrl("http://anagramica.com/all/" + content), function(err, res, body){
			if (err) {
        msg.reply('Critical Request Error');
				return console.log(err);
			} else {
				var anagrams = JSON.parse(body).all.slice(0, 8).join(", \n");
				const output = anagrams;
        msg.returnOutput(client, {
          commandName,
          output
        });
			}
		});
  }
};

const encodeUrl = require('encodeurl'),
request = require("request");

module.exports = {
  hits: ['anag', 'anagram', 'nag-a-ram'],
  handler: (msg, content) => {
    const commandName = "Anagrams";
    function returnOutput(output){
    	msg.channel.send("**" + commandName + "** for " + `${msg.author}` + "```" + output + "```");
    }
    request(encodeUrl("http://anagramica.com/all/" + content), function(err, res, body){
			if (err) {
				return console.log(err);
        msg.reply('Critical Request Error.')
			} else {
				var anagrams = JSON.parse(body).all.join(", \n");
				const output = anagrams;
        returnOutput(output)
			}
		});
  }
}
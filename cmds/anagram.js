const encodeUrl = require('encodeurl'),
got = require("got");

module.exports = {
  hits: ['anag', 'anagram', 'nag-a-ram'],
  handler: (msg, content, client) => {
    const commandName = "Anagrams";
    if (content.length > 10) {
      returnOutput("Sorry, your word is longer than 10 characters");
    } else if (content.match(/^[A-Za-z]+$/)) {
      (async function getAnag() {
        try {
            const response = await got(encodeUrl("http://anagramica.com/best/" + content));
            if (JSON.parse(response.body).best[0] !== undefined){
              var anagrams = JSON.parse(response.body).best.slice(0, 8).join(", \n");
              returnOutput(anagrams).replace('@', '!');
            } else {
              returnOutput("No anagrams were found \nThis does not find multi-word anagrams");
            }
        } catch (error) {
            msg.reply(error.response);
            console.log(error);
        }
      })();
    } else {
      returnOutput("Error: Please make sure you only enter alphabet characters");
    }
    function returnOutput(output){
      msg.returnOutput(msg, {
            commandName,
            output,
            input: content
      });
    }
  }
};

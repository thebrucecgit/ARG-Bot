const encodeUrl = require('encodeurl');
const got = require("got");
const UserError = require("../src/UserError");
const BaseCommand = require("../src/BaseCommand");

module.exports = {
  hits: ['anag', 'anagram', 'nag-a-ram'],
  name: "Anagrams",
  handler: async (content) => {
    if (content.length > 10) throw new UserError("Sorry, your word is longer than 10 characters");

    if (!content.match(/^[A-Za-z]+$/)) 
      throw new UserError("Please make sure you only enter English alphabet characters. No spaces allowed");

    const response = await got(encodeUrl("http://anagramica.com/best/" + content));
    if (JSON.parse(response.body).best[0] === undefined)
      throw new UserError("No anagrams were found");

    const anagrams = JSON.parse(response.body).best.slice(0, 8).join("\n");
    return new BaseCommand(content, anagrams);
  }
};

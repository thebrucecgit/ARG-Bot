const BaseCommand = require("../src/BaseCommand");

module.exports = {
  hits: ['upc', 'uppercase', 'upcase'],
  name: "Uppercase Letters Only",
  handler: (content) => {
    const output = [];
    const letters = /^[A-Za-z]+$/;
    for (let i = 0; i < content.length; i++) {
      if (content[i].match(letters) && content[i] === content[i].toUpperCase())
        output.push(content[i]);
    }
    return new BaseCommand(content, output.join(""));
  }
};

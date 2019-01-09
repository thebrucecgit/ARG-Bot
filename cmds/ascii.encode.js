module.exports = {
  hits: ['asciien', 'asciiencode'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Text to ASCII Decimal Value";
    const arr = content.split("");
    const hexArr = [];

    for (var i = 0; i < arr.length; i++) {
        hexArr.push(arr[i].charCodeAt(0));
    }

    res.output = hexArr.join(" ");
    return res;
  }
};

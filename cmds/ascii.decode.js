module.exports = {
  hits: ['asciide', 'asciidecode'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "ASCII Decimal Valye to Text";
    const arr = content.split(" ");
    const hexArr = [];

    for (var i = 0; i < arr.length; i++) {
        hexArr.push(String.fromCharCode(arr[i]));
    }

    res.output = hexArr.join("").replace('@', '!');
    res.input = content
    return res;
  }
};

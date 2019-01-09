module.exports = {
  hits: ['binde', 'binarydecode'],
  handler: (msg, content) => {
    const res = {};
    res.commandName = "Binary Decoding";
    res.output = content.trim().split(" ")
      .map(item => String.fromCharCode(parseInt(item, 2)))
      .join("");
    return res;
  }
};

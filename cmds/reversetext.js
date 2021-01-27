const BaseCommand = require("../src/BaseCommand");
module.exports = {
  hits: ['reversetext', 'revtext', 'rt'],
  name: "Reverse Text",
  handler: (content) => {
    const arr = content.split("");
    const newArr = new Array(arr.length);
    for (let i in arr)
      newArr[arr.length - i] = arr[i];
    return new BaseCommand(content, newArr.join(""));
  }
};

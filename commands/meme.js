const fs = require("fs");
const memeJsonPath = "./memes/memes.json";
var memeArr = [];

var add = function (msg, meme) {
  memeArr.push(meme)
  fs.writeFile(memeJsonPath, JSON.stringify(memeArr), 'utf-8');
  return msg.reply("Meme added!");
}

var list = function (msg) {
  var memeOutput = "```\n";

  memeArr.forEach(function (meme) {
    memeOutput += "> " + meme + "\n";
  });

  memeOutput += "```"

  return msg.channel.send(memeOutput);
}

var random = function (msg) {
  let randomNo = Math.floor(Math.random() * memeArr.length);
  return msg.channel.send(memeArr[randomNo]);
}

module.exports = {
  "description": "Holds functions for memes",
  "run": function (msg, args) {
    if (!args) return;
    var func = args.shift();
    var meme = args.join(" ");

    fs.readFile(memeJsonPath, function (err, data) {
      if (!err) memeArr = JSON.parse(data);

      switch (func) {
        case "add":
          add(msg, meme);
          break;
        case "list":
          list(msg);
          break;
        case "random":
          random(msg);
          break;
        default:
          msg.reply("Enter a valid meme function. Use !meme help");
      }
    });
  }
}
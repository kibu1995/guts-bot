module.exports = {
  "description": "Flips a coin, replies with result",
  "run": function (msg) {
    var coinFlip = 1 + Math.floor(Math.random() * 2);

    if (coinFlip == 1) {
      return msg.reply("Coin landed on HEADS");
    } else if (coinFlip == 2) {
      return msg.reply("Coin landed on TAILS");
    }
  }
}
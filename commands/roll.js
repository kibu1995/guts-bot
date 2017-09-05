module.exports = {
  "description": "Replies with Pong",
  "run": function (msg, args) {
    let sides = parseInt(args[0], 10);
    if (isNaN(sides)) return msg.reply("Please give a number of sides");

    let diceRoll = 1 + Math.floor(Math.random() * sides);
    return msg.reply("You rolled a " + diceRoll);
  }
}
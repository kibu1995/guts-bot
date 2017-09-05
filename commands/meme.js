module.exports = {
  "description": "Replies to a nice meme",
  "run": function (msg) {
    return msg.channel.send("http://i.imgur.com/KsYpXaP.gifv");
  }
}
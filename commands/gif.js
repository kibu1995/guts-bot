const Giphy = require('giphy-api')();

module.exports = {
  "description": "Searches for a gif",
  "run": function (msg, args) {
    let searchTerms = args.join(" ");

    Giphy.search({
      q: searchTerms,
      limit: 1,
      rating: 'r',
      fmt: 'json'
    })
    .then(function (res) {
      if (res.data[0]) {
        return msg.reply(res.data[0].url);
      } else {
        return msg.reply("No result");
      }
    })
    .catch(function (error) {
      return msg.reply("Could not get gif: " + error);
    });
  }
}
const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays audio from a given youtube url",
  "run": function (msg, args) {
    let searchTerms = args.join(" ");
    return youtubeHelper.search(msg, searchTerms);
  }
}
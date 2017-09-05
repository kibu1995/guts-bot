const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays shooting stars",
  "run": function (msg) {
    let shootingStars = "https://www.youtube.com/watch?v=feA64wXhbjo";
    return youtubeHelper.playAudio(msg, shootingStars);
  }
}
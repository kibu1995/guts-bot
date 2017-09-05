const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays shooting stars (volume percentage)",
  "run": function (msg, args) {
    let shootingStars = "https://www.youtube.com/watch?v=feA64wXhbjo";
    let volume = args[0];

    if (isNaN(parseInt(volume))) {
      return youtubeHelper.playAudio(msg, shootingStars);
    } else {
      return youtubeHelper.playAudio(msg, shootingStars, volume);
    }
  }
}
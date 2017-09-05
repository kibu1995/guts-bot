const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays audio from a given youtube url",
  "run": function (msg, args) { 
    let videoUrl = args[0];
    return youtubeHelper.playAudio(msg, videoUrl);
  }
}
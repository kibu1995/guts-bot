const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays audio from a given youtube url (volume percentage)",
  "run": function (msg, args) { 
    let videoUrl = args[0];
    let volume = args[1];

    if (isNaN(parseInt(volume))) {
      return youtubeHelper.playAudio(msg, videoUrl);
    } else {
      return youtubeHelper.playAudio(msg, videoUrl, volume);
    }
    
  }
}
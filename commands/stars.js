const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Plays shooting stars",
  "run": function (msg) {
    return youtubeHelper.playAudio(msg, "https://www.youtube.com/watch?v=_2GVaKUTyQ0");
  }
}
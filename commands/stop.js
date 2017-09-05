const youtubeHelper = require("../helpers/youtube.js");

module.exports = {
  "description": "Ends the current song",
  "run": function (msg) {
    return youtubeHelper.endAudio(msg);
  }
}
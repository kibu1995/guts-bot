const ytdl = require('ytdl-core');
const YouTube = require("youtube-node");
const Config = require("../config.json");

var youTube = new YouTube();
youTube.setKey(Config.youtubeKey);

var dispatcher;

module.exports = {
  "playAudio": function (msg, videoUrl) {
    let voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.reply("You're not in a voice channel");
    if (!/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(videoUrl)) return msg.reply("Check the link is correct");

    if (dispatcher !== undefined && dispatcher.destroyed == false) dispatcher.end();

    return voiceChannel.join()
      .then(connnection => {
        let stream = ytdl(videoUrl, { filter: 'audioonly' });
        let streamOptions = { seek: 0, volume: 0.1, passes: 3 };
        dispatcher = connnection.playStream(stream, streamOptions);
      });
  },
  "search": function (msg, searchTerms) {
    youTube.search(searchTerms, 1, function (error, result) {
      if (error) errorReply(error, msg);
      else {
        if (!result || !result.items || result.items.length < 1) {
          errorReply("No Result", msg);
        } else {
          if (!result.items[0].id.videoId) {
            msg.reply("Search returned a channel, please be more specific with search terms");
          } else {
            msg.reply("http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
          }
        }
      }
    });
  },
  "endAudio": function (msg) {
    if (dispatcher !== undefined && dispatcher.destroyed == false) {
      dispatcher.end();
      return msg.reply("Ended the song!");
    } else {
      return msg.reply("Nothing is playing!");
    }
  }
}
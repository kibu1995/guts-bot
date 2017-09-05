const ytdl = require('ytdl-core');

module.exports = {
  "description": "Replies with Pong",
  "run": function (msg, args) {
    let voiceChannel = msg.member.voiceChannel;
    let videoUrl = args[0];

    if (!voiceChannel) return msg.reply("You're not in a voice channel");
    return voiceChannel.join()
      .then(connnection => {
        let stream = ytdl(videoUrl, { filter: 'audioonly' });
        let streamOptions = { seek: 0, volume: 0.1, passes: 3 };
        let dispatcher = connnection.playStream(stream, streamOptions);
        dispatcher.on('end', () => voiceChannel.leave());
      });
  }
}
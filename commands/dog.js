const webHelper = require("../helpers/web.js");

module.exports = {
  "description": "Replies with a random dog",
  "run": function (msg) {
    webHelper.getContent('https://random.dog/woof')
      .then(function (res) {
        return msg.reply("https://random.dog/" + res);
      })
      .catch(function (error) {
      return msg.reply("Could not get a dog: " + error);
    });
  }
}
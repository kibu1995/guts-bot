const webHelper = require("../helpers/web.js");

module.exports = {
  "description": "Replies with a random cat",
  "run": function (msg) {
    webHelper.getContent('https://random.cat/meow')
      .then(function (res) {
        let catResp = JSON.parse(res);
        return msg.reply(catResp.file);
      })
      .catch(function (error) {
        return msg.reply("Could not get a cat: " + error);
    });
  }
}
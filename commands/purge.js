module.exports = {
  "description": "Deletes a given number of messages",
  "run": function (msg, args) {
    let deleteNo = parseInt(args[0], 10);

    if (!deleteNo || deleteNo < 2 || deleteNo > 100) return msg.reply("Give a number between 2 and 100");

    msg.channel.fetchMessages({ limit: deleteNo }).then((fetched) => {
      return msg.channel.bulkDelete(fetched).catch(error => msg.reply("Couldn't delete messages: " + error))
    })
  }
}
module.exports = {
  "description": "Deletes a given number of messages",
  "run": function (msg, args) {
    if (!msg.member.roles.some(r=>["Admin, Bot"].includes(r.name))) {
      return msg.reply("Need correct roles to use this");
    }
    let deleteNo = parseInt(args[0], 10);

    if (!deleteNo || deleteNo < 2 || deleteNo > 100) return msg.reply("Give a number between 2 and 100");

    msg.channel.fetchMessages({ limit: deleteNo }).then((fetched) => {
      return msg.channel.bulkDelete(fetched).catch(error => msg.reply("Couldn't delete messages: " + error))
    })
  }
}
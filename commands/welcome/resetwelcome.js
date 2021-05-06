const db = require("quick.db");

const { url } = require("../../server.js");

module.exports = {
  name: "rsetwelcomeimg",

  aliases: ["rsetwimage", "rsetwimg", "resetwelcomeimage"],

  category: "moderation",

  usage: "prefix <new-prefix>",

  description: "Change the guild prefix",

  run: async (client, message, args) => {
    //PERMISSION

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(
        "You are not allowed or do not have permission to change Welcome Image"
      );
    }

    db.delete(`url_${message.guild.id}`);

    return await message.channel.send("Reseted Welcome Image ✅");
  }
};

const { MessageEmbed } = require('discord.js');
const { Color } = require("../../config.json");
module.exports = {
  name: "voicemove",
  aliases: ["moveall"],
  description: "Moves member from VC",
  run: async(client,message,args) => {
    if (!message.member.permissions.any(["MOVE_MEMBERS"])) {
        return message.reply("<a:GC_wrong:810000635113635840> You don't have `Move_Members or Administrator` power to use this command.");
      }
    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send("You Have To Be In A Voice Channel To Use This Command");
    if (!message.guild.me.voice.connection) {
        channel.join().then((connection) => {
            message.guild.me.voice.setSelfDeaf(true);
            const move = new MessageEmbed()
            .setDescription('**<:Demon_Voice:829767809465974807> Move me and I\'ll drag users to a new voice channel.**')
            .setColor(Color)
            message.channel.send(move)

            client.on("voiceStateUpdate", async (oldmem, newmem) => {
                if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {
                    let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);
                    if (client.user.id === newmem.member.user.id) {
                        channel.members.forEach(e => {
                            e.voice.setChannel(newchannel);
                            newchannel.leave();
                        })
                    }
                }
            })
        })
    }
    else {
        message.channel.send(`**I'am already Connected To A Voice Channel.**`);
    }
    }}
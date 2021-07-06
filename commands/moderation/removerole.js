/*//const { defprefix } = require('../botconfig.json');

const Discord = require("discord.js");

module.exports = {
  name: "role-",
  aliases: ["removerole", "rrole"],

  description: "Removes Mentioned Role From The Mentioned User(s)",

  async run(client, message, args) {
    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.reply(
        `I Don't Have Permission To Use This Command! Manage Roles`
      );

    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command! Manage Roles`
      );

    if (!args[0])
      return message.channel.send(
        new Discord.MessageEmbed()

          .setColor("RANDOM")

          .addField("Role-", `\`role- <Role> <User(s)>\``, true)

          .addField("Role- all", `\`role- all <Role>\``, true)

          .addField("Role- bots", `\`role- bots <Role>\``, true)

          .addField("Role- humans", `\`role- humans <Role>\``, true)

          .setTimestamp()
      );

    switch (args[0]) {
      case `bots`:
        if (!args[1])
          return message.channel.send(`\`Usage: role- bots <Role>\``);

        const role1 =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);

        if (message.guild.me.roles.highest.position <= role1.position)
          return message.reply(
            `My Role isn't High Enough to Remove The Role! ${role1.name}`
          );

        if (message.member.roles.highest.position <= role1.position)
          return message.reply(
            `Your Role isn't High Enough to Remove The Role! ${role1.name}`
          );

        const botuser = message.guild.members.cache
          .filter(member => member.user.bot)
          .forEach(member => {
            member.roles.remove(role1);
          });

        await message.channel.send(`Removed \`${role1.name}\` from All Bots.`);

        break;

      case `humans`:
        if (!args[1])
          return message.channel.send(`\`Usage: role- humans <Role>\``);

        const role2 =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);

        if (message.guild.me.roles.highest.position <= role2.position)
          return message.reply(
            `My Role isn't High Enough to Remove The Role! ${role2.name}`
          );

        if (message.member.roles.highest.position <= role2.position)
          return message.reply(
            `Your Role isn't High Enough to Remove The Role! ${role2.name}`
          );

        const humanuser = message.guild.members.cache
          .filter(member => !member.user.bot)
          .forEach(member => {
            member.roles.remove(role2);
          });

        await message.channel.send(
          `Removed \`${role2.name}\` from All Humans.`
        );

        break;

      case `all`:
        if (!args[1])
          return message.channel.send(`\`Usage: role+ all <Role>\``);

        const role3 =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);

        if (message.guild.me.roles.highest.position <= role3.position)
          return message.reply(
            `My Role isn't High Enough to Remove The Role! ${role3.name}`
          );

        if (message.member.roles.highest.position <= role3.position)
          return message.reply(
            `Your Role isn't High Enough to Remove The Role! ${role3.name}`
          );

        const alluser = message.guild.members.cache.forEach(member => {
          member.roles.remove(role3);
        });

        await message.channel.send(`Remove \`${role3.name}\` from Everyone.`);

        break;

      default:
        let roleassign =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[0]);

        if (roleassign.position > message.guild.me.roles.highest.position)
          return message.reply(
            `My Role isn't High Enough to Remove The Role! ${roleassign.name}`
          );

        if (message.member.roles.highest.position <= roleassign.position)
          return message.reply(
            `Your Role isn't High Enough to Remove The Role! ${roleassign.name}`
          );

        if (!roleassign) return message.reply(`No Such Role Exists .`);

        const user = message.mentions.members.forEach(member => {
          member.roles.remove(roleassign);
        });

        await message.channel.send(
          `Remove ${roleassign.name} from ${message.mentions.members
            .map(member => member.user.tag)
            .join(", ")}.`
        );
    }
  }
};
*/
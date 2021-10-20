const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { crewmateRoles, imposterRoles } = require('../other/roles')
const { getImageUrl } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('List all roles!'),
  async execute(interaction) {
    const embeds = []
    crewmateRoles.forEach((r) => {
      embeds.push(
        new MessageEmbed()
          .setColor('#0099ff')
          .setThumbnail(getImageUrl(r.image))
          .setTitle(r.name)
          .setDescription(r.description)
      )
    })
    imposterRoles.forEach((r) => {
      embeds.push(
        new MessageEmbed()
          .setColor('#ff0055')
          .setThumbnail(getImageUrl(r.image))
          .setTitle(r.name)
          .setDescription(r.description)
      )
    })

    interaction.reply({
      embeds: embeds,
    })
  },
}

import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { cameleon, crewmateRoles, imposterRoles } from '../other/roles'
import { Command } from '../types/global'
import { getImageUrl } from '../utils/helpers'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('List all roles!'),
  async execute(interaction) {
    const embeds: MessageEmbed[] = []
    crewmateRoles.forEach((r) => {
      embeds.push(
        new MessageEmbed()
          .setColor('#0099ff')
          .setThumbnail(getImageUrl(r.image))
          .setTitle(r.name)
          .setDescription(r.description)
      )
    })
    embeds.push(
      new MessageEmbed()
        .setColor('#ffffff')
        .setThumbnail(getImageUrl(cameleon.image))
        .setTitle(cameleon.name)
        .setDescription(cameleon.description)
    )
    imposterRoles.forEach((r) => {
      embeds.push(
        new MessageEmbed()
          .setColor('#ff0055')
          .setThumbnail(getImageUrl(r.image))
          .setTitle(r.name)
          .setDescription(r.description)
      )
    })

    await interaction.reply({ embeds })
  },
}

module.exports = command

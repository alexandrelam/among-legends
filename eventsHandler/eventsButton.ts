import { MessageEmbed } from 'discord.js'
import {
  attributeRoles,
  getCurrentPlayer,
  getImageUrl,
  playerJoinTeam,
} from '../utils/helpers'

export const handleButton = async (interaction: any) => {
  if (!interaction.isButton()) return

  if (interaction.customId.includes('join')) {
    if (!interaction.client.game.isPlaying) {
      const teamBlue = interaction.client.game.teamBlue
      const teamRed = interaction.client.game.teamRed
      let embeds: any[] = []

      if (
        interaction.customId === 'join-blue' &&
        !interaction.client.game.isBlueVoting
      ) {
        playerJoinTeam(interaction, teamBlue, teamRed, 'blue')
        attributeRoles(interaction, teamBlue)
        if (interaction.client.game.joinMessage) {
          const { getJoinEmbed } = require('../other/embedHelper')
          embeds = getJoinEmbed(
            interaction.client.game.teamBlue,
            interaction.client.game.teamRed
          )
        }
      }

      if (
        interaction.customId === 'join-red' &&
        !interaction.client.game.isRedVoting
      ) {
        playerJoinTeam(interaction, teamRed, teamBlue, 'red')
        attributeRoles(interaction, teamRed)
        if (interaction.client.game.joinMessage) {
          const { getJoinEmbed } = require('../other/embedHelper')
          embeds = getJoinEmbed(
            interaction.client.game.teamBlue,
            interaction.client.game.teamRed
          )
        }
      }

      if (embeds.length) {
        interaction.client.game.joinMessage.edit({ embeds })
      }

      interaction.client.game.maxBlueImposterCount = teamBlue.length > 3 ? 2 : 1
      interaction.client.game.maxRedImposterCount = teamRed.length > 3 ? 2 : 1
    } else {
      await interaction.reply({
        content: 'You cannot join an ongoing game!',
        ephemeral: true,
      })
    }
  }

  if (interaction.customId === 'get-role') {
    const player = getCurrentPlayer(interaction)
    if (player && player.role) {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${player.role.name} (${player.role.type})`)
        .setDescription(player.role.description)
        .setThumbnail(getImageUrl(player.role.image))

      await interaction.reply({ ephemeral: true, embeds: [embed] })
    } else {
      await interaction.reply({
        content: 'You did not join the game!',
        ephemeral: true,
      })
    }
  }
}

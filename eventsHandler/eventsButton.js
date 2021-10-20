const {
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
  getLeaderboard,
} = require('../utils/helpers')
const { MessageEmbed } = require('discord.js')

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return

  if (interaction.customId.includes('join')) {
    if (!interaction.client.game.isPlaying) {
      const teamBlue = interaction.client.game.teamBlue
      const teamRed = interaction.client.game.teamRed
      const embeds = []

      if (
        interaction.customId === 'join-blue' &&
        !interaction.client.game.isBlueVoting
      ) {
        playerJoinTeam(interaction, teamBlue, teamRed, 'blue')
        attributeRoles(interaction, teamBlue)

        if (interaction.client.game.joinMessage) {
          const blue = getLeaderboard(
            interaction,
            interaction.client.game.teamBlue
          )
          const red = getLeaderboard(
            interaction,
            interaction.client.game.teamRed
          )
          if (blue) embeds.push(blue)
          if (red) embeds.push(red)
        }
      }

      if (
        interaction.customId === 'join-red' &&
        !interaction.client.game.isRedVoting
      ) {
        playerJoinTeam(interaction, teamRed, teamBlue, 'red')
        attributeRoles(interaction, teamRed)

        if (interaction.client.game.joinMessage) {
          const blue = getLeaderboard(
            interaction,
            interaction.client.game.teamBlue
          )
          const red = getLeaderboard(
            interaction,
            interaction.client.game.teamRed
          )
          if (blue) embeds.push(blue)
          if (red) embeds.push(red)
        }
      }
      if (embeds.length) {
        interaction.client.game.joinMessage.edit({
          embeds: embeds,
        })
      }

      if (teamBlue.length > 3) {
        interaction.client.game.maxBlueImposterCount = 2
      } else {
        interaction.client.game.maxBlueImposterCount = 1
      }
      if (teamRed.length > 3) {
        interaction.client.game.maxRedImposterCount = 2
      } else {
        interaction.client.game.maxRedImposterCount = 1
      }
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

      await interaction.reply({
        ephemeral: true,
        embeds: [embed],
      })
    } else {
      await interaction.reply({
        content: 'You did not join the game!',
        ephemeral: true,
      })
    }
  }
}

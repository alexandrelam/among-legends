const {
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
} = require('../utils/helpers')
const { MessageEmbed } = require('discord.js')

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return

  if (interaction.customId.includes('join')) {
    if (!interaction.client.game.isPlaying) {
      const teamBlue = interaction.client.game.teamBlue
      const teamRed = interaction.client.game.teamRed

      if (interaction.customId === 'join-blue') {
        playerJoinTeam(interaction, teamBlue, teamRed, 'blue')
        attributeRoles(interaction, teamBlue)
      }

      if (interaction.customId === 'join-red') {
        playerJoinTeam(interaction, teamRed, teamBlue, 'red')
        attributeRoles(interaction, teamRed)
      }

      // set number of imposter
      const players = [...teamBlue, ...teamRed]
      if (players.length > 3) {
        interaction.client.game.nbImposter = 2
      } else {
        interaction.client.game.nbImposter = 1
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

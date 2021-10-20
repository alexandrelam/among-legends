const { handleVoteImposter } = require('../utils/voteHandler')
const { revealRoles } = require('../utils/endHandler')
const { getCurrentPlayer, getLeaderboard } = require('../utils/helpers')

module.exports.handleSelect = async (interaction) => {
  if (!interaction.isSelectMenu()) return

  if (interaction.customId === 'vote-imposter') {
    const curr_player = getCurrentPlayer(interaction)
    const blueTeam = interaction.client.game.teamBlue
    const redTeam = interaction.client.game.teamRed

    if (curr_player && !curr_player.hasVoted) {
      const isBlueTeam = blueTeam.some((p) => p.tag === curr_player.tag)
      handleVoteImposter(
        interaction,
        curr_player,
        isBlueTeam ? blueTeam : redTeam
      )
    } else {
      interaction.reply({ content: 'You cannot vote twice', ephemeral: true })
    }
    const channel = interaction.client.game.channel

    if (
      !blueTeam.some((p) => !p.hasVoted) &&
      interaction.client.game.isBlueVoting
    ) {
      interaction.client.game.isBlueVoting = false
      if (blueTeam.length) {
        revealRoles(interaction, blueTeam, channel)
        const embed = getLeaderboard(interaction, blueTeam)
        if (channel) channel.send({ embeds: [embed] })
      }
    }

    if (
      !redTeam.some((p) => !p.hasVoted) &&
      interaction.client.game.isRedVoting
    ) {
      interaction.client.game.isRedVoting = false
      if (redTeam.length) {
        revealRoles(interaction, redTeam, channel)
        const embed = getLeaderboard(interaction, redTeam)
        if (channel) channel.send({ embeds: [embed] })
      }
    }
  }
}

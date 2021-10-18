const { handleVoteImposter } = require('../utils/voteHandler')
const { revealRoles } = require('../utils/endHandler')
const { getCurrentPlayer } = require('../utils/helpers')

module.exports.handleSelect = async (interaction) => {
  if (!interaction.isSelectMenu()) return

  if (interaction.customId === 'vote-imposter') {
    const curr_player = getCurrentPlayer(interaction)
    const teams = [
      interaction.client.game.teamBlue,
      interaction.client.game.teamRed,
    ]

    if (!curr_player.hasVoted) handleVoteImposter(interaction, curr_player)
    teams.forEach((arr) => {
      if (arr.length && !arr.some((p) => !p.hasVoted)) {
        revealRoles(interaction, arr)
        interaction.client.game.isVoting = false
      }
    })
  }
}

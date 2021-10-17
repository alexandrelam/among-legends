const { getCurrentPlayer } = require('./helpers')

function givePoint(curr_player, voted_player) {
  if (voted_player.role.type === 'Imposter') {
    if (curr_player) curr_player.score++
  }
}

function handleVoteImposter(interaction) {
  const player = getCurrentPlayer(interaction)

  if (interaction.values[0] === 'nobody') {
    if (
      interaction.client.game.nbImposter === 1 &&
      player.role.type === 'Imposter'
    )
      player.score++
    interaction.reply({ content: 'You voted for nobody', ephemeral: true })
  }

  const players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]

  players.forEach((p) => {
    if (interaction.values[0] === p.tag) {
      givePoint(player, p)
      interaction.reply({
        content: `You voted for ${p.tag}`,
        ephemeral: true,
      })
    }
  })
}

module.exports = { handleVoteImposter }

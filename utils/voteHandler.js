function givePoint(curr_player, voted_player) {
  if (voted_player.role.type === 'Imposter') {
    if (curr_player) curr_player.score++
  }
}

function handleVoteImposter(interaction, player, team) {
  player.hasVoted = true

  if (interaction.values[0] === 'nobody') {
    if (
      team.filter((p) => p.role.type === 'Imposter').length === 1 &&
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

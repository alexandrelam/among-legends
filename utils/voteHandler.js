function givePoint(curr_player, voted_player) {
  if (voted_player.role.type === 'Imposter') {
    if (curr_player) curr_player.score++
  }
}

function handleVoteImposter(interaction, player, team) {
  player.hasVoted = true

  if (interaction.values[0] === 'nobody') {
    if (
      (team.filter((p) => p.role.type === 'Imposter').length === 1 &&
        player.role.type === 'Imposter') ||
      team.filter((p) => p.role.type === 'Imposter').length === 0
    )
      player.score++
    interaction.reply({ content: 'You voted for nobody', ephemeral: true })
  } else if (interaction.values[0] === 'everyone') {
    if (!team.filter((p) => p.role.type !== 'Imposter').length) {
      player.score++
      interaction.reply({ content: 'You voted for everyone', ephemeral: true })
    }
  } else {
    const players = [
      ...interaction.client.game.teamBlue,
      ...interaction.client.game.teamRed,
    ]

    players.forEach((p) => {
      if (interaction.values[0] === p.tag) {
        givePoint(player, p)
        player.votedPlayer = p
        interaction.reply({
          content: `You voted for ${p.tag}`,
          ephemeral: true,
        })
      }
    })
  }
}

function handleVoteMajority(team) {
  const votedImposters = team.filter(
    (p) => p.votedPlayer && p.votedPlayer.role.type === 'Imposter'
  )
  const imposters = team.filter((p) => p.role.type === 'Imposter')
  if (team.length / 2 < votedImposters.length) {
    imposters.forEach((p) => p.score--)
  }
}

module.exports = { handleVoteImposter, handleVoteMajority }

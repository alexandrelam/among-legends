const Player = require('../game/Player')

function givePoint(curr_player, voted_player) {
  if (voted_player.role.type === 'Imposter') {
    if (curr_player) {
      curr_player.score++
      curr_player.computedScore.push('+1 Voted for an Imposter')
    }
  }
}

function handleVoteImposter(interaction, player, team) {
  player.hasVoted = true

  if (interaction.values[0] === 'nobody') {
    if (
      team.filter((p) => p.role.type === 'Imposter').length === 1 &&
      player.role.type === 'Imposter'
    ) {
      player.score++
      player.computedScore.push(
        '+1 Voted for nobody and the team had no impostor apart from him'
      )
    } else if (team.filter((p) => p.role.type === 'Imposter').length === 0) {
      player.score += 2
      player.computedScore.push('+2 Voted for nobody')
    }
    player.votedPlayer = 'Nobody'
    interaction.reply({ content: 'You voted for nobody', ephemeral: true })
  } else if (interaction.values[0] === 'everyone') {
    if (!team.filter((p) => p.role.type !== 'Imposter').length) {
      player.score += 2
      player.computedScore.push('+2 Voted for everyone')
    }
    player.votedPlayer = 'Everyone'
    interaction.reply({ content: 'You voted for everyone', ephemeral: true })
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
    (p) =>
      p.votedPlayer instanceof Player && p.votedPlayer.role.type === 'Imposter'
  )
  const imposters = team.filter((p) => p.role.type === 'Imposter')
  if (team.length / 2 < votedImposters.length) {
    imposters.forEach((p) => {
      p.score--
      p.computedScore.push('-1 The majority of players voted for an Imposter')
    })
  }
}

module.exports = { handleVoteImposter, handleVoteMajority }

function handleEndingGame(winningTeam, losingTeam) {
  winningTeam.forEach((p) => {
    if (p.role.type === 'Crewmate') {
      p.score++
    }
  })
  losingTeam.forEach((p) => {
    if (p.role.type === 'Imposter') {
      p.score++
    }
  })
}

module.exports = { handleEndingGame }

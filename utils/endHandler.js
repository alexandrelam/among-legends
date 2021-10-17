function handleEndingGame(win, interaction) {
  const players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]
  players.forEach((p) => {
    if (
      (win && p.role.type === 'Crewmate') ||
      (!win && p.role.type === 'Imposter')
    ) {
      p.score++
    }
  })
}

module.exports = { handleEndingGame }

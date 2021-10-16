const canardOrders = [
  "Dans les 30 secondes, utilise tout ton kit de sorts! (sauf les sorts d'invocateurs)",
  'Dans les 30 secondes, utilise ton deuxième summoner spell!',
  'Dans les 30 secondes, utilise ton premier summoner spell!',
  'Casse deux plantes de la jungle maintenant!',
  'Pousse ta team à faire un objectif!',
  'Vole 10 sbires à un de tes alliés',
  'Dive dès que possible!',
  'Back maintenant!',
]

function getCanardOrders(userInstance) {
  return setInterval(() => {
    const canardRandomOrder = getRandomOrder()
    userInstance.send(canardRandomOrder)
  }, 2000)
}

function initCanardPlayers(interaction) {
  const players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]
  const canardPlayers = players.filter((p) => p.role.name === 'Canard')

  let intervalIds = []

  canardPlayers.forEach((p) => {
    const id = getCanardOrders(p.userInstance)
    intervalIds.push(id)
  })

  return intervalIds
}

function stopCanardPlayers(intervalIds) {
  intervalIds.forEach((id) => clearInterval(id))
}

function getRandomOrder() {
  const index = Math.floor(Math.random() * canardOrders.length)
  return canardOrders[index]
}

module.exports = { initCanardPlayers, stopCanardPlayers }

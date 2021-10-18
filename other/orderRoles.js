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

const explorateurOrders = [
  'Tête la première, vérifie le contenu de 5 hautes herbes du côté ennemi (sans vision)',
  "Rends toi dans l'alcolve de la botlane!",
  "Rends toi dans l'alcolve de la toplane!",
  'Dis bonjour au Baron/Heraut!',
  'Dis bonjour au Dragon!',
  'Va visiter le blue ennemi!',
  'Va visiter le red ennemi!',
  'Visite la base ennemi!',
]

function getOrders(userInstance, orders, player) {
  return setInterval(() => {
    const randomOrder = getRandomOrder(orders)
    userInstance.send(randomOrder)
    player.orders.push(randomOrder)
  }, /*5 * 60 */ 1000)
}

function initOrderPlayers(interaction) {
  const players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]

  let intervalIds = []

  players.forEach((p) => {
    let id
    p.orders = []
    if (p.role.name === 'Imposter') {
      id = getOrders(p.userInstance, canardOrders, p)
    } else if (p.role.name === 'Explorateur') {
      id = getOrders(p.userInstance, explorateurOrders, p)
    }
    intervalIds.push(id)
  })

  return intervalIds
}

function stopOrderPlayers(intervalIds) {
  intervalIds.forEach((id) => clearInterval(id))
}

function getRandomOrder(orders) {
  const index = Math.floor(Math.random() * orders.length)
  return orders[index]
}

module.exports = { initOrderPlayers, stopOrderPlayers }

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

function getCanardOrders(interaction) {
  const userInstance = interaction.user

  setInterval(() => {
    // toutes les 5 sec, check if timer est true
    if (interaction.client.game.isTimer) {
      setTimeout(() => {
        const canardRandomOrder = getRandomOrder()
        userInstance.send(canardRandomOrder)
      }, 5 * 1000 * 60)
    }
  }, 5000)
}

function getRandomOrder() {
  const index = Math.floor(Math.random() * canardOrders.length)
  return canardOrders[index]
}

module.exports = { getCanardOrders }

const { getRandomInt } = require('../utils/helpers')

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
  }, 5 * 60 * 1000)
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
    p.typeChanges = []
    if (p.role.name === 'Canard') {
      id = getOrders(p.userInstance, canardOrders, p)
    } else if (p.role.name === 'Explorateur') {
      id = getOrders(p.userInstance, explorateurOrders, p)
    } else if (p.role.name === 'Cameleon') {
      p.typeChanges.push(`Started as ${p.role.type}`)
      interaction.client.game.cameleonIntervals.push(
        getType(interaction, p.userInstance, p)
      )
    }
    intervalIds.push(id)
  })

  return intervalIds
}

function getType(interaction, userInstance, player) {
  const minute = 1000 //* 60
  const maxElapsedMinutes = 10 * minute
  const minElapsedMinutes = 3 * minute
  return setRandomInterval(
    () => {
      const oppositeType =
        player.role.type === 'Crewmate' ? 'Imposter' : 'Crewmate'
      player.role.type = oppositeType
      userInstance.send(`You are now: ${oppositeType}`)
      const now = new Date()
      var timeDiff = new Date(now - interaction.client.game.startedGameTime)
      // strip the ms
      timeDiff /= 1000
      // get seconds
      var seconds = Math.round(timeDiff % 60)
      // remove seconds from the date
      timeDiff = Math.floor(timeDiff / 60)
      // get minutes
      var minutes = Math.round(timeDiff % 60)
      player.typeChanges.push(`${minutes}:${seconds} - ${oppositeType}`)
    },
    minElapsedMinutes,
    maxElapsedMinutes
  )
}

const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
  let timeout

  const runInterval = () => {
    const timeoutFunction = () => {
      intervalFunction()
      runInterval()
    }

    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

    timeout = setTimeout(timeoutFunction, delay)
  }

  runInterval()

  return {
    clear() {
      clearTimeout(timeout)
    },
  }
}

function stopOrderPlayers(intervalIds) {
  intervalIds.forEach((id) => clearInterval(id))
}

function stopCameleonPlayers(intervals) {
  intervals.forEach((i) => i.clear())
}

function getRandomOrder(orders) {
  const index = Math.floor(Math.random() * orders.length)
  return orders[index]
}

module.exports = { initOrderPlayers, stopOrderPlayers, stopCameleonPlayers }

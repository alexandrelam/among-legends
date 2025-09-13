const failleCanardOrders = [
  'Utilise tout ton kit de sorts MAINTENANT!',
  'Pousse ta team à faire un objectif !',
  'Pousse ta team à faire un dive !',
  'Vole une wave de sbires à un de tes alliés !',
  'Dive dès que possible !',
  'Achète un Elixir !',
  'Achète 2 balise de contrôle !',
  'Achète 1 potion rechargeable !',
]

const aramCanardOrders = [
  'Utilise tout ton kit de sorts MAINTENANT!',
  'Pousse ta team à faire un dive !',
  'Dive dès que possible !',
  'Achète un Elixir !',
  'Vends un item, potion exclue !',
  'Achète 1 potion rechargeable !',
  'MEURT !',
]

const getCanardOrders = (mode: string) => {
  if (mode === 'ARAM') return aramCanardOrders
  return failleCanardOrders
}

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

interface PlayerLike {
  role: { name: string; type: string }
  orders?: string[]
  userInstance: { send: (msg: string) => void }
  typeChanges?: string[]
}

function getOrders(
  userInstance: PlayerLike['userInstance'],
  orders: string[],
  player: PlayerLike
) {
  return setInterval(() => {
    const randomOrder = getRandomOrder(orders)
    userInstance.send(randomOrder)
    player.orders!.push(randomOrder)
  }, 5 * 60 * 1000)
}

export function initCameleonPlayers(interaction: any) {
  const players: PlayerLike[] = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]

  const intervalIds: Array<() => void> = [] // only stopper functions now

  players.forEach((p) => {
    p.typeChanges = []
    if (p.role.name === 'Cameleon') {
      p.typeChanges.push(`Started as ${p.role.type}`)
      const stopFn = getType(interaction, p.userInstance, p) // returns stopper
      intervalIds.push(stopFn)
    }
  })

  return intervalIds
}

export function initOrderPlayers(interaction: any) {
  const players: PlayerLike[] = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]

  const intervalIds: NodeJS.Timeout[] = []

  players.forEach((p) => {
    let id: NodeJS.Timeout | undefined
    p.orders = []
    if (p.role.name === 'Canard') {
      id = getOrders(
        p.userInstance,
        getCanardOrders(interaction.client.game.selectedMode),
        p
      )
    } else if (p.role.name === 'Explorateur') {
      id = getOrders(p.userInstance, explorateurOrders, p)
    }

    if (id) intervalIds.push(id)
  })

  return intervalIds
}

function getType(
  interaction: any,
  userInstance: PlayerLike['userInstance'],
  player: PlayerLike
) {
  const minute = 1000 * 60
  const maxElapsedMinutes = 10 * minute
  const minElapsedMinutes = 3 * minute
  const initialType = player.role.type

  return setRandomInterval(
    (p: PlayerLike) => {
      if (p.typeChanges!.length % 2 === 1) {
        p.role.type = initialType === 'Crewmate' ? 'Imposter' : 'Crewmate'
      } else {
        p.role.type = initialType
      }

      const now = new Date()
      let timeDiff: any = new Date(
        now.getTime() - interaction.client.game.startedGameTime
      )
      timeDiff /= 1000
      const seconds = ('0' + Math.round(timeDiff % 60)).slice(-2)
      timeDiff = Math.floor(timeDiff / 60)
      const minutes = ('0' + Math.round(timeDiff % 60)).slice(-2)

      userInstance.send(`${minutes}:${seconds} - You are now: ${p.role.type}`)
      p.typeChanges!.push(`${minutes}:${seconds} - ${p.role.type}`)
    },
    minElapsedMinutes,
    maxElapsedMinutes,
    player
  )
}

const setRandomInterval = (
  intervalFunction: (p: PlayerLike) => void,
  minDelay: number,
  maxDelay: number,
  player: PlayerLike
): (() => void) => {
  let timeout: NodeJS.Timeout | undefined
  let active = true

  const runInterval = () => {
    if (!active) return
    const timeoutFunction = (p: PlayerLike) => {
      if (!active) return
      intervalFunction(p)
      runInterval()
    }
    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay
    timeout = setTimeout(timeoutFunction, delay, player)
  }

  runInterval()

  return () => {
    active = false
    if (timeout) clearTimeout(timeout)
  }
}

export function stopOrderPlayers(intervalIds: NodeJS.Timeout[]) {
  intervalIds.forEach((id) => clearTimeout(id))
}

export function stopCameleonPlayers(intervals: Array<() => void>) {
  intervals.forEach((stop) => stop())
}

function getRandomOrder(orders: string[]) {
  const index = Math.floor(Math.random() * orders.length)
  return orders[index]
}

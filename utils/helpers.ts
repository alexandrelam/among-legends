import { ButtonInteraction } from 'discord.js'
import { Player } from '../game/Player'
import { Role, roles } from '../other/roles'

const config = require('../config.json')

export function isPlayerInTeam(playerTag: string, team: Player[]): boolean {
  return team.some((p) => p.tag === playerTag)
}

export function playerJoinTeam(
  interaction: ButtonInteraction,
  team: Player[],
  opposingTeam: Player[],
  teamLabel: string
): void {
  const playerTag = interaction.user.tag

  const newPlayer = new Player(playerTag)

  // if player is in opposite team switch him
  if (isPlayerInTeam(playerTag, opposingTeam)) {
    opposingTeam.splice(opposingTeam.indexOf(newPlayer), 1)
    team.push(newPlayer)

    interaction.reply({
      content: `${playerTag} switched to ${teamLabel} team`,
    })

    // if player is not already in team add him
  } else if (!isPlayerInTeam(playerTag, team)) {
    team.push(newPlayer)

    interaction.reply({
      content: `${playerTag} joined ${teamLabel} team`,
    })

    // if player is already in team don't add him
  } else {
    interaction.reply({
      content: `${playerTag} is already in ${teamLabel} team`,
    })
  }
}

export function attributeRoles(
  interaction: ButtonInteraction,
  team: Player[]
): void {
  team.forEach((p) => {
    p.role = getRandomRole(interaction)
  })
}

function getRandomRole(interaction: any): Role {
  let flatten: Role[] = []
  roles.forEach((role: Role) => {
    for (let i = 0; i < role.weight * 100; i++) {
      flatten.push(role)
    }
  })
  flatten = shuffle(flatten)
  const role = flatten[Math.floor(Math.random() * flatten.length)]
  const max_nb_imposter = interaction.client.game.nbImposter

  if (getNumberImposter(interaction) >= max_nb_imposter)
    getRandomRole(interaction)

  return role
}

function getNumberImposter(interaction: any): number {
  const players: Player[] = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]

  return players.filter((p) => p.role?.type === 'Imposter').length
}

function shuffle<T>(a: T[]): T[] {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export function getImageUrl(imageName: string): string {
  return `https://raw.githubusercontent.com/${config.gituser}/${config.repo}/main/assets/${imageName}`
}

export function getCurrentPlayer(interaction: any): Player {
  const player_tag = interaction.user.tag
  const all_players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]
  return all_players.find((p) => player_tag === p.tag)
}

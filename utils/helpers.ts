import { MessageEmbed } from 'discord.js'
import config from '../config.json'
import Player from '../game/Player'
import { cameleon, getCrewmateRoles, imposterRoles } from '../other/roles'

export function isPlayerInTeam(playerTag: string, team: any[]) {
  return team.some((p) => p.tag === playerTag)
}

export function playerJoinTeam(
  interaction: any,
  team: any[],
  opposingTeam: any[],
  teamLabel: string
) {
  const userInstance = interaction.user
  const playerTag = userInstance.tag

  const newPlayer = new (Player as any)(userInstance)

  if (isPlayerInTeam(playerTag, opposingTeam)) {
    const playerToSwitch = opposingTeam.find((p) => p.tag === playerTag)
    opposingTeam.splice(opposingTeam.indexOf(playerToSwitch), 1)
    team.push(playerToSwitch)

    interaction.reply({
      content: `You switched to ${teamLabel} team`,
      ephemeral: true,
    })
  } else if (!isPlayerInTeam(playerTag, team)) {
    team.push(newPlayer)
    interaction.reply({
      content: `You joined ${teamLabel} team`,
      ephemeral: true,
    })
  } else {
    interaction.reply({
      content: `You already are in ${teamLabel} team`,
      ephemeral: true,
    })
  }
}

function attributeSameRole(interaction: any, team: any[]) {
  const isAllCameleon = getRandomInt(4) === 0
  if (isAllCameleon) {
    team.forEach((p) => {
      p.role = cameleon
      p.role.type = getRandomInt(2) === 0 ? 'Crewmate' : 'Imposter'
    })
  } else {
    const isAllCrewmate = getRandomInt(2) === 0
    const sameRole = weightedRand(
      isAllCrewmate
        ? getCrewmateRoles(interaction.client.game.selectedMode)
        : imposterRoles
    )
    team.forEach((p) => (p.role = sameRole))
  }
}
function attributeDifferentRoles(interaction: any, team: any[]) {
  const mapped_roles: any[] = []
  const isBlueTeam = team === interaction.client.game.teamBlue
  const oneCameleon = getRandomInt(3) === 0
  let imposter_count =
    getRandomInt(
      isBlueTeam
        ? interaction.client.game.maxBlueImposterCount
        : interaction.client.game.maxRedImposterCount
    ) + 1

  if (imposter_count === 2 && oneCameleon) {
    imposter_count -= 1
    const role = cameleon
    role.type = getRandomInt(2) === 0 ? 'Crewmate' : 'Imposter'
    mapped_roles.push(role)
  }

  for (let i = 0; i < imposter_count; i++) {
    mapped_roles.push(weightedRand(imposterRoles))
  }

  while (mapped_roles.length < team.length) {
    mapped_roles.push(
      weightedRand(getCrewmateRoles(interaction.client.game.selectedMode))
    )
  }

  shuffle(mapped_roles)
  for (let j = 0; j < mapped_roles.length; j++) {
    team[j].role = mapped_roles[j]
  }
}

export function attributeRoles(interaction: any, team: any[]) {
  const isAllSameRoles = getRandomInt(5) === 0
  if (isAllSameRoles) {
    attributeSameRole(interaction, team)
  } else {
    attributeDifferentRoles(interaction, team)
  }
}

function weightedRand(list: { weight: number }[]) {
  const total = list.reduce((sum, i) => sum + i.weight, 0)
  let r = Math.random() * total

  for (const i of list) {
    if (r < i.weight) return i
    r -= i.weight
  }
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getChannel(interaction: any) {
  return interaction.client.channels.cache.get(interaction.channelId)
}

export function getImageUrl(imageName: string) {
  return `https://raw.githubusercontent.com/${(config as any).gituser}/${
    (config as any).repo
  }/main/assets/${imageName}`
}

export function getCurrentPlayer(interaction: any) {
  const player_tag = interaction.user.tag
  const all_players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]
  return all_players.find((p) => player_tag === p.tag)
}

export function getPlayer(interaction: any, player_tag: string) {
  const all_players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]
  return all_players.find((p) => player_tag === p.tag)
}

export function getLeaderboard(interaction: any, team: any[]) {
  const isBlueTeam = team === interaction.client.game.teamBlue
  team.sort((a, b) => (a.score > b.score ? -1 : 1))

  let tags: string[] = [],
    score: number[] = [],
    rank: number[] = []

  if (team.length) {
    tags = team.map((p) => p.tag.split('#')[0])
    score = team.map((p) => p.score)
    for (let i = 0; i < tags.length; i++) {
      rank.push(i + 1)
    }

    return new MessageEmbed()
      .setColor(isBlueTeam ? '#0099ff' : '#ff0055')
      .setAuthor(
        'Leaderboard',
        'https://raw.githubusercontent.com/alexandrelam/among-legends/main/assets/trophy.png'
      )
      .addFields(
        { name: 'Rank', value: rank.join('\n'), inline: true },
        { name: 'Tag', value: tags.join('\n'), inline: true },
        { name: 'Score', value: score.join('\n'), inline: true }
      )
  }
}

export default {
  isPlayerInTeam,
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
  getChannel,
  getLeaderboard,
  getRandomInt,
  getPlayer,
}

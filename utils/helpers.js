const Player = require('../game/Player')
const config = require('../config.json')
const { crewmateRoles, imposterRoles } = require('../other/roles')

function isPlayerInTeam(playerTag, team) {
  return team.some((p) => p.tag === playerTag)
}

function playerJoinTeam(interaction, team, opposingTeam, teamLabel) {
  const userInstance = interaction.user
  const playerTag = userInstance.tag

  const newPlayer = new Player(userInstance)

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

function attributeRoles(interaction, team) {
  var mapped_roles = []
  const imposter_count = getRandomInt(interaction.client.game.nbImposter) + 1
  const canardrole = crewmateRoles.find((r) => r.name === 'Canard')
  mapped_roles.push(canardrole)
  /*
  for (let i = 0; i < imposter_count; i++) {
    //Push imposters
    mapped_roles.push(weightedRand(imposterRoles))
  }
  */
  while (mapped_roles.length < team.length) {
    //Fill with random roles
    mapped_roles.push(weightedRand(crewmateRoles))
  }
  shuffle(mapped_roles)
  for (let j = 0; j < mapped_roles.length; j++) {
    team[j].role = mapped_roles[j]
  }
}

function weightedRand(list) {
  var i,
    sum = 0,
    r = Math.random()
  for (i of list) {
    sum += i.weight
    if (r <= sum) return i
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function getImageUrl(imageName) {
  return `https://raw.githubusercontent.com/${config.gituser}/${config.repo}/main/assets/${imageName}`
}

function getCurrentPlayer(interaction) {
  const player_tag = interaction.user.tag
  const all_players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ]
  return all_players.find((p) => player_tag === p.tag)
}

module.exports = {
  isPlayerInTeam,
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
}

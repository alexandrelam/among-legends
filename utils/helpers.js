const Player = require("../game/Player");
const roles = require("../other/roles");
const config = require("../config.json");

function isPlayerInTeam(playerTag, team) {
  return team.some((p) => p.tag === playerTag);
}

function playerJoinTeam(interaction, team, opposingTeam, teamLabel) {
  const playerTag = interaction.user.tag;

  newPlayer = new Player(playerTag);

  // if player is in opposite team switch him
  if (isPlayerInTeam(playerTag, opposingTeam)) {
    opposingTeam.splice(opposingTeam.indexOf(newPlayer), 1);
    team.push(newPlayer);

    interaction.reply({
      content: `${playerTag} switched to ${teamLabel} team`,
    });

    // if player is not already in team add him
  } else if (!isPlayerInTeam(playerTag, team)) {
    team.push(newPlayer);

    interaction.reply({
      content: `${playerTag} joined ${teamLabel} team`,
    });

    // if player is already in team don't add him
  } else {
    interaction.reply({
      content: `${playerTag} is already in ${teamLabel} team`,
    });
  }
}

function attributeRoles(interaction, team) {
  team.forEach((p) => {
    p.role = getRandomRole(interaction);
  });
}

function getRandomRole(interaction, team) {
  // il faut forcer au moins 1 ou 2 imposter
  // les étapes :
  // 1. définir au hasard le nb d'impsoter
  // 2. attribuer au hasard les imposters dans un arr
  // 3. parmi les joueurs qui reste il faut leur donner un role
  // done!
  /*
  let flatten = [];
  roles.forEach((role) => {
    for (let i = 0; i < role.weight * 100; i++) {
      flatten.push(role);
    }
  });
  flatten = shuffle(flatten);
  const role = flatten[Math.floor(Math.random() * flatten.length)];
  const max_nb_imposter = interaction.client.game.nbImposter;

  if (getNumberImposter(interaction) >= max_nb_imposter)
    getRandomRole(interaction);

  return role;
  */
}

function getNbTeamImposter(interaction, team) {
  let sum = 0;
  team.forEach((p) => {
    if (p.role.type === "Imposter") sum++;
  });
  return sum;
}

function getNumberImposter(interaction) {
  const players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ];

  let sum = 0;

  players.forEach((p) => {
    if (p.role.type === "Imposter") sum++;
  });

  return sum;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function getImageUrl(imageName) {
  return `https://raw.githubusercontent.com/${config.gituser}/${config.repo}/main/assets/${imageName}`;
}

function getCurrentPlayer(interaction) {
  const player_tag = interaction.user.tag;
  const all_players = [
    ...interaction.client.game.teamBlue,
    ...interaction.client.game.teamRed,
  ];
  return all_players.find((p) => player_tag === p.tag);
}

module.exports = {
  isPlayerInTeam,
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
};

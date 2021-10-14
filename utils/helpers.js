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

function attributeRoles(team) {
  team.forEach((p) => {
    p.role = getRandomRole();
  });
}

function getRandomRole() {
  let flatten = [];
  roles.forEach((role) => {
    for (let i = 0; i < role.weight * 100; i++) {
      flatten.push(role);
    }
  });
  flatten = shuffle(flatten);
  return flatten[Math.floor(Math.random() * flatten.length)];
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

module.exports = {
  isPlayerInTeam,
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
};

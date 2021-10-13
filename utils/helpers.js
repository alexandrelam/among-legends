const Player = require("../game/Player");

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

    // if player already in team don't add him
  } else if (!isPlayerInTeam(playerTag, team)) {
    team.push(newPlayer);

    interaction.reply({
      content: `${playerTag} joined ${teamLabel} team`,
    });
  } else {
    interaction.reply({
      content: `${playerTag} is already in ${teamLabel} team`,
    });
  }
}

module.exports = { isPlayerInTeam, playerJoinTeam };

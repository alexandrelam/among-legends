function givePoint(curr_player, voted_player) {
  if (voted_player.role.type === "Imposter") {
    curr_player.score++;
  }
}

function getOppositeRole(role) {
  return role === "Crewmate" ? "Imposter" : "Crewmate";
}

module.exports = { givePoint };

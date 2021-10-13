const { playerJoinTeam } = require("./helpers");

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "join-blue") {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;
    playerJoinTeam(interaction, teamBlue, teamRed, "blue");
  }

  if (interaction.customId === "join-red") {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;
    playerJoinTeam(interaction, teamRed, teamBlue, "red");
  }
};

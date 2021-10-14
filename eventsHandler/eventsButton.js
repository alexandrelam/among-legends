const { playerJoinTeam, attributeRoles } = require("../utils/helpers");

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "join-blue") {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;
    playerJoinTeam(interaction, teamBlue, teamRed, "blue");
    attributeRoles(teamBlue);
  }

  if (interaction.customId === "join-red") {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;
    playerJoinTeam(interaction, teamRed, teamBlue, "red");
    attributeRoles(teamRed);
  }

  if (interaction.customId === "get-role") {
    const player_tag = interaction.user.tag;
    const all_players = [
      ...interaction.client.game.teamBlue,
      ...interaction.client.game.teamRed,
    ];
    const player = all_players.find((p) => player_tag === p.tag);

    interaction.reply({ content: `${player.role.name}`, ephemeral: true });
  }
};

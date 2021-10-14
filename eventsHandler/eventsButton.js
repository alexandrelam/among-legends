const {
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
} = require("../utils/helpers");
const { MessageEmbed } = require("discord.js");

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "join-blue") {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;
    playerJoinTeam(interaction, teamBlue, teamRed, "blue");
    attributeRoles(interaction, teamBlue);
  }

  if (interaction.customId === "join-red") {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;
    playerJoinTeam(interaction, teamRed, teamBlue, "red");
    attributeRoles(interaction, teamRed);
  }

  if (interaction.customId === "get-role") {
    const player = getCurrentPlayer(interaction);
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${player.role.name} (${player.role.type})`)
      .setDescription(player.role.description)
      .setThumbnail(getImageUrl(player.role.image));

    await interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
  }
};

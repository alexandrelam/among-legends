const {
  playerJoinTeam,
  attributeRoles,
  getImageUrl,
  getCurrentPlayer,
} = require("../utils/helpers");
const { MessageEmbed } = require("discord.js");

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId.includes("join")) {
    const teamBlue = interaction.client.game.teamBlue;
    const teamRed = interaction.client.game.teamRed;

    if (interaction.customId === "join-blue") {
      playerJoinTeam(interaction, teamBlue, teamRed, "blue");
      attributeRoles(interaction, teamBlue);
    }

    if (interaction.customId === "join-red") {
      playerJoinTeam(interaction, teamRed, teamBlue, "red");
      attributeRoles(interaction, teamRed);
    }

    // set number of imposter
    const players = [...teamBlue, ...teamRed];
    if (players.length > 3) {
      interaction.client.game.nbImposter = 2;
    } else {
      interaction.client.game.nbImposter = 1;
    }
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

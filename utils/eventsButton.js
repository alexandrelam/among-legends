module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "join") {
    interaction.client.game.teamBlue.push(interaction.user.tag);
    interaction.reply({
      content: `${interaction.user.tag} joined the game`,
    });
  }
};

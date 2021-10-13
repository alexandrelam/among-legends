const Player = require("../game/Player");

module.exports.handleButton = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "join") {
    newPlayer = new Player(interaction.user.tag);
    interaction.client.game.teamBlue.push(newPlayer);
    interaction.reply({
      content: `${interaction.user.tag} joined the game`,
    });
  }
};

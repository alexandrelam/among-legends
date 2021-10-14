const { givePoint } = require("../utils/voteHandler");
const { getCurrentPlayer } = require("../utils/helpers");

module.exports.handleSelect = async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "vote-imposter") {
    if (interaction.values[0] === "nobody") {
      interaction.reply({ content: "You voted for nobody", ephemeral: true });
    }

    const players = [
      ...interaction.client.game.teamBlue,
      ...interaction.client.game.teamRed,
    ];

    const player = getCurrentPlayer(interaction);

    players.forEach((p) => {
      if (interaction.values[0] === p.tag) {
        givePoint(player, p);
        interaction.reply({
          content: `You voted for ${p.tag}`,
          ephemeral: true,
        });
      }
    });
  }
};

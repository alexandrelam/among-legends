module.exports.handleSelect = async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "select") {
    interaction.reply({
      content: "Something was selected!",
      ephemeral: true,
    });
  }

  if (interaction.customId === "vote-imposter") {
    if (interaction.values[0] === "nobody") {
      interaction.reply({ content: "You voted for nobody", ephemeral: true });
    }
  }
};

module.exports.handleSelect = async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "select") {
    interaction.reply({
      content: "Something was selected!",
      ephemeral: true,
    });
  }
};

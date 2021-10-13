module.exports.handleCommand = async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};

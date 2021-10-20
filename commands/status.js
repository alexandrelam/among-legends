const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Display game status'),
  async execute(interaction) {
    if (interaction.client.game.isPlaying)
      await interaction.reply('Game has started')
    else await interaction.reply('Game is stopped')
  },
}

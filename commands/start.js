const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the game'),
  async execute(interaction) {
    interaction.client.game.isTimer = true

    interaction.reply('Game has started!')
  },
}

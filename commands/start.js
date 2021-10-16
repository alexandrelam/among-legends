const { SlashCommandBuilder } = require('@discordjs/builders')
const { initCanardPlayers } = require('../other/canard')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the game'),
  async execute(interaction) {
    interaction.client.game.intervalIds = initCanardPlayers(interaction)

    interaction.reply('Game has started!')
  },
}

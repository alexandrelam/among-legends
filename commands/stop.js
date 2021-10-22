const { SlashCommandBuilder } = require('@discordjs/builders')
const { stopOrderPlayers } = require('../other/orderRoles')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the game'),
  async execute(interaction) {
    interaction.client.game.isPlaying = false
    stopOrderPlayers(interaction.client.game.intervalIds)
    stopCameleonPlayers(interaction.client.game.cameleonIntervals)
    interaction.reply('Game has stopped')
  },
}

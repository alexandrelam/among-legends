const { SlashCommandBuilder } = require('@discordjs/builders')
const { stopOrderPlayers } = require('../other/orderRoles')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the game'),
  async execute(interaction) {
    stopOrderPlayers(interaction.client.game.intervalIds)
    interaction.reply('Game has stopped')
  },
}

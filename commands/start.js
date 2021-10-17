const { SlashCommandBuilder } = require('@discordjs/builders')
const { initOrderPlayers } = require('../other/orderRoles')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the game'),
  async execute(interaction) {
    interaction.client.game.isPlaying = true
    interaction.client.game.isVoting = false
    interaction.client.game.intervalIds = initOrderPlayers(interaction)

    interaction.reply('Game has started!')
  },
}

const { SlashCommandBuilder } = require('@discordjs/builders')
const { initOrderPlayers } = require('../other/orderRoles')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the game'),
  async execute(interaction) {
    const players = [
      ...interaction.client.game.teamBlue,
      ...interaction.client.game.teamRed,
    ]
    if (
      !interaction.client.game.isPlaying &&
      !interaction.client.game.isVoting &&
      players.length !== 0
    ) {
      interaction.client.game.isPlaying = true
      interaction.client.game.isVoting = false
      interaction.client.game.intervalIds = initOrderPlayers(interaction)

      interaction.reply('Game has started!')
    } else {
      interaction.reply('Cannot start game')
    }
  },
}

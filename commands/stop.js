const { SlashCommandBuilder } = require('@discordjs/builders')
const { stopCanardPlayers } = require('../other/canard')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the game'),
  async execute(interaction) {
    stopCanardPlayers(interaction.client.game.intervalIds)
    interaction.reply('Game has stopped')
  },
}

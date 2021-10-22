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
      !interaction.client.game.isBlueVoting &&
      !interaction.client.game.isRedVoting &&
      players.length !== 0
    ) {
      interaction.client.game.isPlaying = true
      interaction.client.game.isBlueVoting = false
      interaction.client.game.isRedVoting = false
      interaction.client.game.startedGameTime = new Date()
      interaction.client.game.intervalIds = initOrderPlayers(interaction)

      players.forEach((p) => {
        p.hasVoted = false
        p.votedPlayer = null
      })

      interaction.reply('Game has started!')
    } else {
      interaction.reply('Cannot start game')
    }
  },
}

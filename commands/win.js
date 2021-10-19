const { SlashCommandBuilder } = require('@discordjs/builders')
const { stopOrderPlayers } = require('../other/orderRoles')
const { handleEndingGame } = require('../utils/endHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('win')
    .setDescription('End the game and choose the winning team.')
    .addStringOption((option) =>
      option
        .setName('team')
        .setDescription('Choose the winning team')
        .setRequired(true)
        .addChoice('Blue', 'Blue')
        .addChoice('Red', 'Red')
    ),
  async execute(interaction) {
    if (interaction.client.game.isPlaying) {
      interaction.client.game.isPlaying = false
      interaction.client.game.isBlueVoting = true
      interaction.client.game.isRedVoting = true

      stopOrderPlayers(interaction.client.game.intervalIds)

      const team = interaction.options.getString('team')
      var winningTeam, losingTeam
      if (team === 'Blue') {
        winningTeam = interaction.client.game.teamBlue
        losingTeam = interaction.client.game.teamRed
      } else if (team === 'Red') {
        winningTeam = interaction.client.game.teamRed
        losingTeam = interaction.client.game.teamBlue
      }

      handleEndingGame(winningTeam, losingTeam)

      interaction.reply({
        content: `${team} team has won the game`,
      })
    } else {
      await interaction.reply({
        content: 'There is no game to end',
        ephemeral: true,
      })
    }
  },
}

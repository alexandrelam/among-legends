import { SlashCommandBuilder } from '@discordjs/builders'
import Player from '../game/Player'
import { stopCameleonPlayers, stopOrderPlayers } from '../other/orderRoles'
import { Command } from '../types/global'
import { handleEndingGame } from '../utils/endHandler'

const command: Command = {
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
      interaction.client.game.startedGameTime = null

      stopOrderPlayers(interaction.client.game.intervalIds)
      stopCameleonPlayers(interaction.client.game.cameleonIntervals)

      const team = interaction.options.getString('team', true)
      let winningTeam: Player[]
      let losingTeam: Player[]
      if (team === 'Blue') {
        winningTeam = interaction.client.game.teamBlue
        losingTeam = interaction.client.game.teamRed
      } else if (team === 'Red') {
        winningTeam = interaction.client.game.teamRed
        losingTeam = interaction.client.game.teamBlue
      }

      handleEndingGame(winningTeam!, losingTeam!)

      await interaction.reply({ content: `${team} team has won the game` })
    } else {
      await interaction.reply({
        content: 'There is no game to end',
        ephemeral: true,
      })
    }
  },
}

module.exports = command

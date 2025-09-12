import { SlashCommandBuilder } from '@discordjs/builders'
import { initCameleonPlayers, initOrderPlayers } from '../other/orderRoles'
import { Command } from '../types/global'

const command: Command = {
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
      interaction.client.game.cameleonIntervals =
        initCameleonPlayers(interaction)

      players.forEach((p: any) => {
        p.hasVoted = false
        p.votedPlayer = null
        p.computedScore = []
      })

      await interaction.reply('Game has started!')
    } else {
      await interaction.reply('Cannot start game')
    }
  },
}

module.exports = command

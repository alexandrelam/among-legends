import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { stopCameleonPlayers, stopOrderPlayers } from '../other/orderRoles'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the game'),
  async execute(interaction: CommandInteraction) {
    interaction.client.game.isPlaying = false
    stopOrderPlayers(interaction.client.game.intervalIds)
    stopCameleonPlayers(interaction.client.game.cameleonIntervals)
    await interaction.reply('Game has stopped')
  },
}

module.exports = command

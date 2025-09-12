import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Display game status'),
  async execute(interaction) {
    if (interaction.client.game.isPlaying)
      await interaction.reply('Game has started')
    else await interaction.reply('Game is stopped')
  },
}

module.exports = command

import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { Command } from '../types/global'
import { getCurrentPlayer } from '../utils/helpers'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add points')
    .addIntegerOption((option) =>
      option
        .setName('nb-points')
        .setDescription('Add the number of points entered')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const nbPointsAdded = interaction.options.getInteger('nb-points', true)
    const user: any = getCurrentPlayer(interaction)

    if (user) {
      user.score += nbPointsAdded
      await interaction.reply(`Added ${nbPointsAdded} points to ${user.tag}`)
    } else {
      await interaction.reply('You need to join the game before adding points')
    }
  },
}

module.exports = command

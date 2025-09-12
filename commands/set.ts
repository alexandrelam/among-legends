import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../types/global'
import { getCurrentPlayer } from '../utils/helpers'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Set points')
    .addIntegerOption((option) =>
      option
        .setName('nb-points')
        .setDescription('Set the number of points entered')
        .setRequired(true)
    ),
  async execute(interaction) {
    const nbPointsAdded = interaction.options.getInteger('nb-points', true)
    const user: any = getCurrentPlayer(interaction)

    if (user) {
      user.score = nbPointsAdded
      await interaction.reply(`Set ${nbPointsAdded} points to ${user.tag}`)
    } else {
      await interaction.reply('You need to join the game before adding points')
    }
  },
}

module.exports = command

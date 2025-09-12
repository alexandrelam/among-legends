import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Display the list of players'),
  async execute(interaction) {
    const { getLeaderboard } = require('../utils/helpers')
    const blueEmbed = getLeaderboard(
      interaction,
      interaction.client.game.teamBlue
    )
    const redEmbed = getLeaderboard(
      interaction,
      interaction.client.game.teamRed
    )

    const embeds: any[] = []
    if (blueEmbed) embeds.push(blueEmbed)
    if (redEmbed) embeds.push(redEmbed)

    if (embeds.length === 0) {
      await interaction.reply('No players')
    } else {
      await interaction.reply({ embeds })
    }
  },
}

module.exports = command

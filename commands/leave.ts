import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the game!')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user').setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.client.game.isPlaying) {
      const teamBlue = interaction.client.game.teamBlue
      const teamRed = interaction.client.game.teamRed

      const players = [...teamBlue, ...teamRed]
      const user = interaction.options.getUser('user')
      const { getPlayer, getCurrentPlayer } = require('../utils/helpers')
      const curr_player = user
        ? getPlayer(interaction, `${user.username}#${user.discriminator}`)
        : getCurrentPlayer(interaction)

      if (curr_player && players.some((p: any) => p.tag === curr_player.tag)) {
        if (teamBlue.some((p: any) => p.tag === curr_player.tag)) {
          interaction.client.game.teamBlue = teamBlue.filter(
            (p: any) => p.tag !== curr_player.tag
          )
          await interaction.reply(`${curr_player.tag} left the game`)
        } else if (teamRed.some((p: any) => p.tag === curr_player.tag)) {
          interaction.client.game.teamRed = teamRed.filter(
            (p: any) => p.tag !== curr_player.tag
          )
          await interaction.reply(`${curr_player.tag} left the game`)
        }

        const { getJoinEmbed } = require('../other/embedHelper')
        const embeds = getJoinEmbed(
          interaction.client.game.teamBlue,
          interaction.client.game.teamRed
        )
        if (embeds.length && interaction.client.game.joinMessage) {
          interaction.client.game.joinMessage.edit({ embeds })
        }
      } else {
        await interaction.reply({
          content: `Player isn't in a game`,
          ephemeral: true,
        })
      }
    }
  },
}

module.exports = command

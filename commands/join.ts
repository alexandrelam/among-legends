import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton } from 'discord.js'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Make players join for the game!'),
  async execute(interaction) {
    if (!interaction.client.game.isPlaying) {
      const row = new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId('join-blue')
          .setLabel('Join blue team')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('join-red')
          .setLabel('Join red team')
          .setStyle('DANGER'),
      ])

      const { getJoinEmbed } = require('../other/embedHelper')
      const embeds = getJoinEmbed(
        interaction.client.game.teamBlue,
        interaction.client.game.teamRed
      )

      if (embeds.length) {
        await interaction.reply({ components: [row], embeds })
      } else {
        await interaction.reply({ content: '** **', components: [row] })
      }

      interaction.client.game.joinMessage = await interaction.fetchReply()
    } else {
      await interaction.reply({
        content: 'You cannot join an ongoing game',
        ephemeral: true,
      })
    }
  },
}

module.exports = command

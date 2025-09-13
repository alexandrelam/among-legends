import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton } from 'discord.js'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('mode')
    .setDescription('Choisissez le mode de jeu'),
  async execute(interaction) {
    const modeRow = new MessageActionRow().addComponents([
      new MessageButton()
        .setCustomId('mode-aram')
        .setLabel('ARAM')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('mode-faille')
        .setLabel("Faille de l'invocateur")
        .setStyle('SECONDARY'),
    ])
    await interaction.reply({
      content: 'Choisissez un mode :',
      components: [modeRow],
    })
    interaction.client.game.joinMessage = await interaction.fetchReply()
  },
}

module.exports = command

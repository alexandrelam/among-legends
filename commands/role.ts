import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton } from 'discord.js'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Give role to players'),
  async execute(interaction) {
    const btn = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('get-role')
        .setLabel('Get your role!')
        .setStyle('SUCCESS')
    )

    await interaction.reply({
      content: 'Click the button to get your role',
      components: [btn],
    })
  },
}

module.exports = command

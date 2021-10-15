const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
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

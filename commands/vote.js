const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for the player you think is the imposter'),
  async execute(interaction) {
    const players = [
      ...interaction.client.game.teamBlue,
      ...interaction.client.game.teamRed,
    ]

    let choices = players.map((p) => ({ label: p.tag, value: p.tag }))
    choices.push({ label: 'Nobody', value: 'nobody' })

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('vote-imposter')
        .setPlaceholder('Select someone')
        .addOptions(choices)
    )

    await interaction.reply({
      content: 'Vote for the player you think is the imposter!',
      components: [row],
    })
  },
}

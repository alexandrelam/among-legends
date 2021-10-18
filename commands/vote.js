const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const { getCurrentPlayer } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for the player you think is the imposter'),
  async execute(interaction) {
    if (interaction.client.game.isVoting) {
      const curr_player = getCurrentPlayer(interaction)
      const team = interaction.client.game.teamBlue.some(
        (p) => p.tag === curr_player.tag
      )
        ? interaction.client.game.teamBlue
        : interaction.client.game.teamRed

      let choices = team.map((p) => ({ label: p.tag, value: p.tag }))
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
    } else {
      await interaction.reply({
        content: 'You have to wait for the game to end in order to vote',
        ephemeral: true,
      })
    }
  },
}

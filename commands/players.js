const { SlashCommandBuilder } = require('@discordjs/builders')
const { getLeaderboard } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Display the list of players'),
  async execute(interaction) {
    const embeds = getLeaderboard(interaction)

    if (embeds.length === 0) {
      await interaction.reply('No players')
    } else {
      await interaction.reply({
        embeds: embeds,
      })
    }
  },
}

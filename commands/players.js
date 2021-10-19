const { SlashCommandBuilder } = require('@discordjs/builders')
const { getLeaderboard } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Display the list of players'),
  async execute(interaction) {
    const blueEmbed = getLeaderboard(
      interaction,
      interaction.client.game.teamBlue
    )
    const redEmbed = getLeaderboard(
      interaction,
      interaction.client.game.teamRed
    )

    const embeds = []
    if (blueEmbed) embeds.push(blueEmbed)
    if (redEmbed) embeds.push(redEmbed)

    if (embeds.length === 0) {
      await interaction.reply('No players')
    } else {
      await interaction.reply({
        embeds: embeds,
      })
    }
  },
}

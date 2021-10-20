const { SlashCommandBuilder } = require('@discordjs/builders')
const { attributeRoles } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reroll')
    .setDescription('Reroll all roles!'),
  async execute(interaction) {
    if (
      !interaction.client.game.isPlaying &&
      !interaction.client.game.isBlueVoting &&
      !interaction.client.game.isRedVoting
    ) {
      if (interaction.client.game.teamBlue.length)
        attributeRoles(interaction, interaction.client.game.teamBlue)
      if (interaction.client.game.teamRed.length)
        attributeRoles(interaction, interaction.client.game.teamRed)
      await interaction.reply('Rerolled all players role')
    } else {
      await interaction.reply('You cannot reroll while the game is running')
    }
  },
}

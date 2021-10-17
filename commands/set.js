const { SlashCommandBuilder } = require('@discordjs/builders')
const { getCurrentPlayer } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Set points')
    .addIntegerOption((option) =>
      option
        .setName('nb-points')
        .setDescription('Set the number of points entered')
        .setRequired(true)
    ),

  async execute(interaction) {
    const nbPointsAdded = interaction.options.getInteger('nb-points')
    const user = getCurrentPlayer(interaction)

    if (user) {
      user.score = nbPointsAdded
      interaction.reply(`Set ${nbPointsAdded} points to ${user.tag}`)
    } else {
      interaction.reply('You need to join the game before adding points')
    }
  },
}

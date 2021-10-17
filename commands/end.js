const { SlashCommandBuilder } = require('@discordjs/builders')
const { stopOrderPlayers } = require('../other/orderRoles')
const { handleEndingGame } = require('../utils/endHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('end')
    .setDescription('End the game and choose whether you won or lost.')
    .addBooleanOption((option) =>
      option
        .setName('win')
        .setDescription('Choose whether you won (true) or lost (false)')
        .setRequired(true)
    ),
  async execute(interaction) {
    //todo: Lister les roles des gens
    if (interaction.client.game.isPlaying) {
      interaction.client.game.isPlaying = false
      interaction.client.game.isVoting = true
      stopOrderPlayers(interaction.client.game.intervalIds)
      const win = interaction.options.getBoolean('win')
      handleEndingGame(win, interaction)
      interaction.reply(`Game has ended in a ${win ? 'win' : 'loss'}`)
    } else {
      await interaction.reply({
        content: 'There is no game to end',
        ephemeral: true,
      })
    }
  },
}

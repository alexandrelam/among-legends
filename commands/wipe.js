const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('wipe')
    .setDescription('Reset game and remove all players'),
  async execute(interaction) {
    interaction.client.game.isPlaying = false
    interaction.client.game.isBlueVoting = false
    interaction.client.game.isRedVoting = false
    interaction.client.game.teamBlue = []
    interaction.client.game.teamRed = []
    interaction.client.game.maxBlueImposterCount = 1
    interaction.client.game.maxRedImposterCount = 1
    interaction.client.game.intervalIds = []
    interaction.client.game.channel = null
    interaction.reply('Boom, big reset!')
  },
}

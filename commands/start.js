const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the game'),
  async execute(interaction) {
    interaction.client.game.isGameStart = true
    interaction.reply('Game started!')
  },
}

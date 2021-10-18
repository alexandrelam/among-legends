const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js')
const { getCurrentPlayer } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the game!'),
  async execute(interaction) {
    if (!interaction.client.game.isPlaying) {
      const players = [
        ...interaction.client.game.teamBlue,
        ...interaction.client.game.teamRed,
      ]
      const curr_player = getCurrentPlayer(interaction)
      if (curr_player && players.some((p) => p.tag === curr_player.tag)) {
        const teamBlue = interaction.client.game.teamBlue
        const teamRed = interaction.client.game.teamRed

        if (teamBlue.some((p) => p.tag === curr_player.tag)) {
          interaction.client.game.teamBlue = teamBlue.filter(
            (p) => p.tag !== curr_player.tag
          )
          await interaction.reply(`${curr_player.tag} left the game`)
        } else if (teamRed.some((p) => p.tag === curr_player.tag)) {
          interaction.client.game.teamRed = teamRed.filter(
            (p) => p.tag !== curr_player.tag
          )
          await interaction.reply(`${curr_player.tag} left the game`)
        }
      } else {
        await interaction.reply({
          content: `You aren't in a game`,
          ephemeral: true,
        })
      }
    }
  },
}

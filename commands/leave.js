const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js')
const { getJoinEmbed } = require('../other/embedHelper')
const { getCurrentPlayer, getPlayer } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the game!')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user').setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.client.game.isPlaying) {
      const teamBlue = interaction.client.game.teamBlue
      const teamRed = interaction.client.game.teamRed

      const players = [...teamBlue, ...teamRed]
      const user = interaction.options.getUser('user')
      const curr_player = user
        ? getPlayer(interaction, `${user.username}#${user.discriminator}`)
        : getCurrentPlayer(interaction)

      if (curr_player && players.some((p) => p.tag === curr_player.tag)) {
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

        const embeds = getJoinEmbed(
          interaction.client.game.teamBlue,
          interaction.client.game.teamRed
        )
        if (embeds.length && interaction.client.game.joinMessage) {
          interaction.client.game.joinMessage.edit({
            embeds: embeds,
          })
        }
      } else {
        await interaction.reply({
          content: `Player isn't in a game`,
          ephemeral: true,
        })
      }
    }
  },
}

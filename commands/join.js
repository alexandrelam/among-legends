const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js')
const { getLeaderboard } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Make players join for the game!'),
  async execute(interaction) {
    if (!interaction.client.game.isPlaying) {
      const row = new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId('join-blue')
          .setLabel('Join blue team')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('join-red')
          .setLabel('Join red team')
          .setStyle('DANGER'),
      ])

      const teamBlueEmbed = getLeaderboard(
        interaction,
        interaction.client.game.teamBlue
      )
      const teamRedEmbed = getLeaderboard(
        interaction,
        interaction.client.game.teamRed
      )

      const embeds = []
      if (teamBlueEmbed) embeds.push(teamBlueEmbed)
      if (teamRedEmbed) embeds.push(teamRedEmbed)
      console.log(row)
      if (embeds.length) {
        await interaction.reply({
          components: [row],
          embeds: embeds,
        })
      } else {
        await interaction.reply({
          content: '** **', //Invisible content (Can't send Buttons-only messages..)
          components: [row],
        })
      }

      interaction.client.game.joinMessage = await interaction.fetchReply()
    } else {
      await interaction.reply({
        content: 'You cannot join an ongoing game',
        ephemeral: true,
      })
    }
  },
}

const { SlashCommandBuilder } = require('@discordjs/builders')
const { stopOrderPlayers } = require('../other/orderRoles')
const { handleEndingGame } = require('../utils/endHandler')
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('win')
    .setDescription('End the game and choose the winning team.')
    .addStringOption((option) =>
      option
        .setName('team')
        .setDescription('Choose the winning team')
        .setRequired(true)
        .addChoice('Blue', 'Blue')
        .addChoice('Red', 'Red')
    ),
  async execute(interaction) {
    if (interaction.client.game.isPlaying) {
      interaction.client.game.isPlaying = false
      interaction.client.game.isVoting = true

      stopOrderPlayers(interaction.client.game.intervalIds)

      const team = interaction.options.getString('team')
      var winningTeam, losingTeam
      if (team === 'Blue') {
        winningTeam = interaction.client.game.teamBlue
        losingTeam = interaction.client.game.teamRed
      } else if (team === 'Red') {
        winningTeam = interaction.client.game.teamRed
        losingTeam = interaction.client.game.teamBlue
      }

      handleEndingGame(winningTeam, losingTeam)

      const bluePlayers = interaction.client.game.teamBlue.map(
        (p) =>
          `${p.tag} - ${p.role.type} - ${p.role.name} : ${p.role.description}`
      )
      const redPlayers = interaction.client.game.teamRed.map(
        (p) =>
          `${p.tag} - ${p.role.type} - ${p.role.name} : ${p.role.description}`
      )

      var embeds = []

      if (bluePlayers.length !== 0) {
        const blue = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Blue players')
          .setDescription(`${bluePlayers.join('\n')}`)
        embeds.push(blue)
      }

      if (redPlayers.length !== 0) {
        const red = new MessageEmbed()
          .setColor('#ff0055')
          .setTitle('Red players')
          .setDescription(`${redPlayers.join('\n')}`)
        embeds.push(red)
      }

      if (embeds.length === 0) {
        await interaction.reply('No players')
      } else {
        await interaction.reply({
          content: `${team} team has won the game`,
          embeds: embeds,
        })
      }
    } else {
      await interaction.reply({
        content: 'There is no game to end',
        ephemeral: true,
      })
    }
  },
}

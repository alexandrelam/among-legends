const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, UserFlags } = require('discord.js')
const { getImageUrl } = require('../utils/helpers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Display the list of players'),
  async execute(interaction) {
    const bluePlayers = interaction.client.game.teamBlue
    const redPlayers = interaction.client.game.teamRed

    bluePlayers.sort((a, b) => (a.score > b.score ? -1 : 1))
    redPlayers.sort((a, b) => (a.score > b.score ? -1 : 1))

    let blueTags = [],
      blueScore = [],
      blueRank = [],
      redTags = [],
      redScore = [],
      redRank = []

    if (bluePlayers.length) {
      blueTags = bluePlayers.map((p) => p.tag.split('#')[0])
      blueScore = bluePlayers.map((p) => p.score)
      for (let i = 0; i < blueTags.length; i++) {
        blueRank.push(i + 1)
      }
    }

    if (redPlayers.length) {
      redTags = redPlayers.map((p) => p.tag.split('#')[0])
      redScore = redPlayers.map((p) => p.score)
      for (let i = 0; i < redTags.length; i++) {
        redRank.push(i + 1)
      }
    }

    var embeds = []

    if (bluePlayers.length !== 0) {
      const blue = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(
          'Leaderboard',
          'https://raw.githubusercontent.com/alexandrelam/among-legends/main/assets/trophy.png'
        )
        .addFields(
          { name: 'Rank', value: blueRank.join('\n'), inline: true },
          { name: 'Tag', value: blueTags.join('\n'), inline: true },
          { name: 'Score', value: blueScore.join('\n'), inline: true }
        )
      embeds.push(blue)
    }

    if (redPlayers.length !== 0) {
      const red = new MessageEmbed()
        .setColor('#ff0055')
        .setAuthor(
          'Leaderboard',
          'https://raw.githubusercontent.com/alexandrelam/among-legends/main/assets/trophy.png'
        )
        .addFields(
          { name: 'Rank', value: redRank.join('\n'), inline: true },
          { name: 'Tag', value: redTags.join('\n'), inline: true },
          { name: 'Score', value: redScore.join('\n'), inline: true }
        )
      embeds.push(red)
    }

    if (embeds.length === 0) {
      await interaction.reply('No players')
    } else {
      await interaction.reply({
        embeds: embeds,
      })
    }
  },
}

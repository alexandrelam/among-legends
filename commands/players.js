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
      redTags = [],
      redScore = []

    if (bluePlayers.length) {
      blueTags = bluePlayers.map((p) => p.tag.split('#')[0])
      blueScore = bluePlayers.map((p) => p.score)
    }

    if (redPlayers.length) {
      redTags = redPlayers.map((p) => p.tag.split('#')[0])
      redScore = redPlayers.map((p) => p.score)
    }

    var embeds = []

    if (bluePlayers.length !== 0) {
      const blue = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Alexandre', getImageUrl('faker.jpg'))
        .setTitle('Blue players')
        .addFields(
          { name: 'Tag', value: blueTags.join('\n'), inline: true },
          { name: 'Score', value: blueScore.join('\n'), inline: true }
        )
      embeds.push(blue)
    }

    if (redPlayers.length !== 0) {
      const red = new MessageEmbed()
        .setColor('#ff0055')
        .setTitle('Red players')
        .addFields(
          { name: 'Tag', value: blueTags.join('\n'), inline: true },
          { name: 'Score', value: blueScore.join('\n'), inline: true }
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

const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Display the list of players'),
  async execute(interaction) {
    const bluePlayers = interaction.client.game.teamBlue.map(
      (p) => `${p.tag} - ${p.score}`
    )
    const redPlayers = interaction.client.game.teamRed.map(
      (p) => `${p.tag} - ${p.score}`
    )

    bluePlayers.sort((a, b) => (a.score > b.score ? -1 : 1))
    redPlayers.sort((a, b) => (a.score > b.score ? -1 : 1))

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
        embeds: embeds,
      })
    }
  },
}

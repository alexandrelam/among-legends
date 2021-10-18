const { MessageEmbed } = require('discord.js')

function handleEndingGame(winningTeam, losingTeam) {
  winningTeam.forEach((p) => {
    if (p.role.type === 'Crewmate') {
      p.score++
    }
  })
  losingTeam.forEach((p) => {
    if (p.role.type === 'Imposter') {
      p.score++
    }
  })
}

function revealRoles(interaction, team) {
  const channel = interaction.client.channels.cache.get(interaction.channelId)

  if (channel) {
    const isBlueTeam = team === interaction.client.game.teamBlue

    var tags = [],
      roleNames = [],
      roleDescriptions = []

    if (team.length) {
      tags = team.map((p) => p.tag.split('#')[0])
      roleNames = team.map((p) => p.role.name)
      roleDescriptions = team.map((p) => p.role.description)

      const embed = new MessageEmbed()
        .setColor(isBlueTeam ? '#0099ff' : '#ff0055')
        .setAuthor(
          isBlueTeam ? 'Blue players roles' : 'Red players roles',
          'https://raw.githubusercontent.com/alexandrelam/among-legends/main/assets/role.png'
        )
        .addFields(
          { name: 'Tag', value: tags.join('\n'), inline: true },
          { name: 'Role', value: roleNames.join('\n'), inline: true },
          {
            name: 'Description',
            value: roleDescriptions.join('\n'),
            inline: true,
          }
        )
      channel.send({ embeds: [embed] })
    }
  }
}

module.exports = { handleEndingGame, revealRoles }

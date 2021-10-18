const { MessageEmbed } = require('discord.js')
const { getChannel } = require('./helpers')

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
  const channel = getChannel(interaction)

  if (channel) {
    const isBlueTeam = team === interaction.client.game.teamBlue

    if (team.length) {
      const embeds = []
      team.forEach((p) => {
        embeds.push(
          new MessageEmbed()
            .setColor(isBlueTeam ? '#0099ff' : '#ff0055')
            .setAuthor(
              isBlueTeam ? 'Blue players roles' : 'Red players roles',
              'https://raw.githubusercontent.com/alexandrelam/among-legends/main/assets/role.png'
            )
            .addFields(
              { name: 'Tag', value: p.tag.split('#')[0], inline: true },
              { name: 'Role', value: p.role.name, inline: true },
              {
                name: 'Description',
                value: p.role.description,
                inline: true,
              },
              {
                name: 'Orders',
                value: p.orders.join('\n'),
              }
            )
        )
      })
      channel.send({ embeds: embeds })
    }
  }
}

module.exports = { handleEndingGame, revealRoles }

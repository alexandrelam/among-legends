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
        var embed = new MessageEmbed()
          .setColor(isBlueTeam ? '#0099ff' : '#ff0055')
          .setAuthor(
            p.tag.split('#')[0],
            `https://cdn.discordapp.com/avatars/${p.userInstance.id}/${p.userInstance.avatar}.png`
          )
          .addFields(
            { name: 'Role', value: p.role.name, inline: true },
            {
              name: 'Description',
              value: p.role.description,
              inline: true,
            }
          )
        if (p.orders.length) embed.addField('Orders', p.orders.join('\n'))
        embeds.push(embed)
      })
      channel.send({ embeds: embeds })
    }
  }
}

module.exports = { handleEndingGame, revealRoles }

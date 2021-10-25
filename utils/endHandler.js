const { MessageEmbed } = require('discord.js')
const Player = require('../game/Player')
const { getImageUrl } = require('./helpers')

function handleEndingGame(winningTeam, losingTeam) {
  winningTeam.forEach((p) => {
    if (p.role.type === 'Crewmate') {
      p.score++
      p.computedScore.push('+1 Won the game')
    }
  })
  losingTeam.forEach((p) => {
    if (p.role.type === 'Imposter') {
      p.score++
      p.computedScore.push('+1 Lost the game')
    }
  })
}

function revealRoles(interaction, team, channel) {
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
          .setThumbnail(getImageUrl(p.role.image))
          .addFields(
            { name: 'Role', value: p.role.name, inline: true },
            {
              name: 'Description',
              value: p.role.description,
              inline: true,
            },
            {
              name: 'Voted',
              value:
                p.votedPlayer instanceof Player
                  ? p.votedPlayer.tag.split('#')[0]
                  : p.votedPlayer,
            }
          )
        if (p.computedScore.length)
          embed.addField('Score Detail', p.computedScore.join('\n'))
        if (p.orders.length) embed.addField('Orders', p.orders.join('\n'))
        if (p.typeChanges.length)
          embed.addField('Side Changes', p.typeChanges.join('\n'))
        embeds.push(embed)
      })
      channel.send({ embeds: embeds })
    }
  }
}

module.exports = { handleEndingGame, revealRoles }

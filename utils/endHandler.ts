import { MessageEmbed } from 'discord.js'
import Player from '../game/Player'
import { getImageUrl } from './helpers'

export function handleEndingGame(winningTeam: Player[], losingTeam: Player[]) {
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

export function revealRoles(interaction: any, team: any[], channel: any) {
  if (channel) {
    const isBlueTeam = team === interaction.client.game.teamBlue
    if (team.length) {
      const embeds: MessageEmbed[] = []
      team.forEach((p) => {
        const embed = new MessageEmbed()
          .setColor(isBlueTeam ? '#0099ff' : '#ff0055')
          .setAuthor(
            p.tag.split('#')[0],
            `https://cdn.discordapp.com/avatars/${p.userInstance.id}/${p.userInstance.avatar}.png`
          )
          .setThumbnail(getImageUrl(p.role.image))
          .addFields(
            { name: 'Role', value: p.role.name, inline: true },
            { name: 'Description', value: p.role.description, inline: true },
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
      channel.send({ embeds })
    }
  }
}

export default { handleEndingGame, revealRoles }

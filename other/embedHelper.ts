import { MessageEmbed } from 'discord.js'

export function getVoteEmbed(teamBlue: any[], teamRed: any[]) {
  const embeds: MessageEmbed[] = []
  let blue: MessageEmbed | null = null
  let red: MessageEmbed | null = null
  if (teamBlue.filter((p) => !p.hasVoted).length) {
    blue = new MessageEmbed()
      .setColor('#0099ff')
      .setAuthor('Votes pending')
      .setDescription(
        teamBlue
          .filter((p) => !p.hasVoted)
          .map((p) => p.tag.split('#')[0])
          .join('\n')
      )
  }
  if (teamRed.filter((p) => !p.hasVoted).length) {
    red = new MessageEmbed()
      .setColor('#ff0055')
      .setAuthor('Votes pending')
      .setDescription(
        teamRed
          .filter((p) => !p.hasVoted)
          .map((p) => p.tag.split('#')[0])
          .join('\n')
      )
  }
  if (blue) embeds.push(blue)
  if (red) embeds.push(red)
  return embeds
}

export function getJoinEmbed(teamBlue: any[], teamRed: any[]) {
  const embeds: MessageEmbed[] = []
  let blue: MessageEmbed | null = null
  let red: MessageEmbed | null = null
  if (teamBlue.length) {
    blue = new MessageEmbed()
      .setColor('#0099ff')
      .setAuthor('Players')
      .setDescription(teamBlue.map((p) => p.tag.split('#')[0]).join('\n'))
  }
  if (teamRed.length) {
    red = new MessageEmbed()
      .setColor('#ff0055')
      .setAuthor('Players')
      .setDescription(teamRed.map((p) => p.tag.split('#')[0]).join('\n'))
  }
  if (blue) embeds.push(blue)
  if (red) embeds.push(red)
  return embeds
}

export default { getVoteEmbed, getJoinEmbed }

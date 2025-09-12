import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'
import { Command } from '../types/global'

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for the player you think is the imposter'),
  async execute(interaction) {
    if (
      interaction.client.game.isBlueVoting ||
      interaction.client.game.isRedVoting
    ) {
      const teamBlue = interaction.client.game.teamBlue
      const teamRed = interaction.client.game.teamRed
      const { getChannel } = require('../utils/helpers')
      interaction.client.game.channel = getChannel(interaction)

      teamBlue.forEach((p: any) => {
        const choices = teamBlue
          .filter((player: any) => p.tag !== player.tag)
          .map((player: any) => ({ label: player.tag, value: player.tag }))
        choices.push({ label: 'Nobody', value: 'nobody' })
        choices.push({ label: 'Everyone', value: 'everyone' })

        p.userInstance.send({
          content: 'Vote for the player you think is the imposter!',
          components: [
            new MessageActionRow().addComponents(
              new MessageSelectMenu()
                .setCustomId('vote-imposter')
                .setPlaceholder('Select someone')
                .addOptions(choices)
            ),
          ],
        })
      })

      teamRed.forEach((p: any) => {
        const choices = teamRed
          .filter((player: any) => p.tag !== player.tag)
          .map((player: any) => ({ label: player.tag, value: player.tag }))
        choices.push({ label: 'Nobody', value: 'nobody' })
        choices.push({ label: 'Everyone', value: 'everyone' })

        p.userInstance.send({
          content: 'Vote for the player you think is the imposter!',
          components: [
            new MessageActionRow().addComponents(
              new MessageSelectMenu()
                .setCustomId('vote-imposter')
                .setPlaceholder('Select someone')
                .addOptions(choices)
            ),
          ],
        })
      })

      const { getVoteEmbed } = require('../other/embedHelper')
      const embed = getVoteEmbed(teamBlue, teamRed)

      await interaction.reply({
        content: 'Vote for the player you think is the imposter in DM!',
        embeds: embed,
      })

      interaction.client.game.voteMessage = await interaction.fetchReply()
    } else {
      await interaction.reply({
        content: 'You have to wait for the game to end in order to vote',
        ephemeral: true,
      })
    }
  },
}

module.exports = command

const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const { getCurrentPlayer, getChannel } = require('../utils/helpers')

module.exports = {
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
      interaction.client.game.channel = getChannel(interaction)

      teamBlue.forEach((p) => {
        let choices = teamBlue
          .filter((player) => p.tag !== player.tag)
          .map((player) => ({
            label: player.tag,
            value: player.tag,
          }))
        choices.push({ label: 'Nobody', value: 'nobody' })

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

      teamRed.forEach((p) => {
        let choices = teamRed
          .filter((player) => p.tag !== player.tag)
          .map((player) => ({
            label: player.tag,
            value: player.tag,
          }))
        choices.push({ label: 'Nobody', value: 'nobody' })

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

      await interaction.reply({
        content: 'Vote for the player you think is the imposter in DM!',
      })
    } else {
      await interaction.reply({
        content: 'You have to wait for the game to end in order to vote',
        ephemeral: true,
      })
    }
  },
}

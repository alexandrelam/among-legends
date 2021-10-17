const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for the player you think is the imposter'),
  async execute(interaction) {
    //todo: Faire qu'on ne puisse voter qu'une fois et pas soi-même
    //todo2: Faire apparaitre le scoreboard une fois que tt le monde a voté
    if (interaction.client.game.isVoting) {
      const players = [
        ...interaction.client.game.teamBlue,
        ...interaction.client.game.teamRed,
      ]

      let choices = players.map((p) => ({ label: p.tag, value: p.tag }))
      choices.push({ label: 'Nobody', value: 'nobody' })

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId('vote-imposter')
          .setPlaceholder('Select someone')
          .addOptions(choices)
      )

      await interaction.reply({
        content: 'Vote for the player you think is the imposter!',
        components: [row],
      })
    } else {
      await interaction.reply({
        content: 'You have to wait for the game to end in order to vote',
        ephemeral: true,
      })
    }
  },
}

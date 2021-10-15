const { handleVoteImposter } = require('../utils/voteHandler')

module.exports.handleSelect = async (interaction) => {
  if (!interaction.isSelectMenu()) return

  if (interaction.customId === 'vote-imposter') {
    handleVoteImposter(interaction)
  }
}

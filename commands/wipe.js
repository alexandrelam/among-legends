const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("wipe")
    .setDescription("Reset game and remove all players"),
  async execute(interaction) {
    interaction.client.game.isGameStart = false;
    interaction.client.game.isRunning = false;
    interaction.client.game.teamBlue = [];
    interaction.client.game.teamRed = [];
    interaction.reply("Boom, big reset!");
  },
};

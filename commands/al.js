const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("al")
    .setDescription("Base command for Among Legends!"),
  async execute(interaction) {
    await interaction.reply("You are among legends");
  },
};

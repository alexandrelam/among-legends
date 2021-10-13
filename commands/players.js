const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("List of all the players"),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("List of players")
      .setDescription(`${interaction.client.game.teamBlue.join("\n")}`);
    await interaction.reply({
      embeds: [embed],
    });
  },
};

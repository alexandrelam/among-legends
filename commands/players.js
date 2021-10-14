const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("Display the list of players"),
  async execute(interaction) {
    const bluePlayers = interaction.client.game.teamBlue.map(
      (p) => `${p.tag} - ${p.score}`
    );
    const redPlayers = interaction.client.game.teamRed.map(
      (p) => `${p.tag} - ${p.score}`
    );

    const blue = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Blue players")
      .setDescription(`${bluePlayers.join("\n")}`);

    const red = new MessageEmbed()
      .setColor("#ff0055")
      .setTitle("Red players")
      .setDescription(`${redPlayers.join("\n")}`);

    await interaction.reply({
      embeds: [blue, red],
    });
  },
};

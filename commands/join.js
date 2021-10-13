const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make players join for the game!"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("join")
        .setLabel("Join")
        .setStyle("SUCCESS")
    );

    await interaction.reply({
      content: "Click the button to join the game",
      components: [row],
    });
  },
};

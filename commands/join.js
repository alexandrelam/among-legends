const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make players join for the game!"),
  async execute(interaction) {
    const blue = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("join-blue")
        .setLabel("Join blue team")
        .setStyle("PRIMARY")
    );

    const red = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("join-red")
        .setLabel("Join red team")
        .setStyle("DANGER")
    );

    await interaction.reply({
      content: "Click the button to join the game",
      components: [blue, red],
    });
  },
};

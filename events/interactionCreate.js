const { handleButton } = require("../eventsHandler/eventsButton");
const { handleCommand } = require("../eventsHandler/eventsCommand");
const { handleSelect } = require("../eventsHandler/eventsSelect");
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    handleCommand(interaction);
    handleSelect(interaction);
    handleButton(interaction);
  },
};

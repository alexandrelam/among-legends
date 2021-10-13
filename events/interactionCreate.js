const { handleButton } = require("../utils/eventsButton");
const { handleCommand } = require("../utils/eventsCommand");
const { handleSelect } = require("../utils/eventsSelect");
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    handleCommand(interaction);
    handleSelect(interaction);
    handleButton(interaction);
  },
};

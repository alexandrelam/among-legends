import { handleButton } from '../eventsHandler/eventsButton'
import { handleCommand } from '../eventsHandler/eventsCommand'
import { handleSelect } from '../eventsHandler/eventsSelect'

module.exports = {
  name: 'interactionCreate',
  async execute(interaction: any) {
    handleCommand(interaction)
    handleSelect(interaction)
    handleButton(interaction)
  },
}

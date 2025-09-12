import { Client, Collection, Intents } from 'discord.js'
import 'dotenv/config'
import fs from 'fs'
import game from './game/game'
import { Command } from './types/global'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection<string, Command>()
client.game = game

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
for (const file of commandFiles) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const command: Command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
for (const file of eventFiles) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

client.login(process.env.TOKEN)

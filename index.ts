import fs = require('fs')
import { game } from './game/game'
require('dotenv').config()
import { Client, Collection, Intents } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()

client.game = game

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args))
  } else {
    client.on(event.name, (...args: any) => event.execute(...args))
  }
}

client.login(process.env.TOKEN)

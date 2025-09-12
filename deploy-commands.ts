import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import 'dotenv/config'
import fs from 'fs'

const commands: any[] = []
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

for (const file of commandFiles) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const command = require(`./commands/${file}`)

  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string)

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID as string,
      process.env.GUILD_ID as string
    ),
    { body: commands }
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)

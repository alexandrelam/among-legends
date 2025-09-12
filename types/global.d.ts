import { Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { GameState } from '../game/game'

export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: CommandInteraction) => Promise<void>
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>
    game: GameState
  }
}

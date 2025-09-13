import Player from './Player'

export interface GameState {
  isPlaying: boolean
  isBlueVoting: boolean
  isRedVoting: boolean
  teamBlue: Player[]
  teamRed: Player[]
  maxBlueImposterCount: number
  maxRedImposterCount: number
  channel: any // TODO: specify TextChannel
  intervalIds: NodeJS.Timeout[]
  joinMessage: any
  voteMessage: any
  startedGameTime: Date | null
  cameleonIntervals: (() => void)[]
  selectedMode: 'ARAM' | 'FAILLE' | null
}

export const game: GameState = {
  isPlaying: false,
  isBlueVoting: false,
  isRedVoting: false,
  teamBlue: [],
  teamRed: [],
  maxBlueImposterCount: 1,
  maxRedImposterCount: 1,
  channel: null,
  intervalIds: [],
  joinMessage: null,
  voteMessage: null,
  startedGameTime: null,
  cameleonIntervals: [],
  selectedMode: null,
}

export default game

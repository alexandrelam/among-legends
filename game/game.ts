import { Player } from './Player'

export class game {
  isRunning: boolean = false
  isGameStart: boolean = false //used for timer of every 5 mins
  isTwoTeam: boolean = false
  teamBlue: Player[] = []
  teamRed: Player[] = []
  nbImposter: number = 1
}

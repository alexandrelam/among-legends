export default class Player {
  tag = ''
  userInstance: any = null
  score = 0
  role: any = ''
  hasVoted = false
  orders: string[] = []
  votedPlayer: any = null
  typeChanges: string[] = []
  computedScore: any[] = []

  constructor(userInstance: any) {
    this.tag = userInstance.tag
    this.userInstance = userInstance
  }
}

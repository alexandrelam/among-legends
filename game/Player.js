module.exports = class Player {
  tag = ''
  userInstance = null
  score = 0
  role = ''
  hasVoted = false
  orders = []
  votedPlayer = null
  typeChanges = []

  constructor(userInstance) {
    this.tag = userInstance.tag
    this.userInstance = userInstance
  }
}

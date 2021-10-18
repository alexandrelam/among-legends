module.exports = class Player {
  tag = ''
  userInstance = null
  score = 0
  role = ''
  hasVoted = false
  orders = []

  constructor(userInstance) {
    this.tag = userInstance.tag
    this.userInstance = userInstance
  }
}

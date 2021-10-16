module.exports = class Player {
  tag = ''
  userInstance = null
  score = 0
  role = ''

  constructor(userInstance) {
    this.tag = userInstance.tag
    this.userInstance = userInstance
  }
}

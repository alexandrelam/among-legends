module.exports = {
  isPlaying: false,
  isBlueVoting: false,
  isRedVoting: false,
  teamBlue: [],
  teamRed: [],
  maxBlueImposterCount: 1,
  maxRedImposterCount: 1,
  channel: null,
  intervalIds: [], // Need this to stop setInterval at the end of the game
  joinMessage: null,
}

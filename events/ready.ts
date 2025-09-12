module.exports = {
  name: 'ready',
  once: true,
  execute(client: any) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  },
}

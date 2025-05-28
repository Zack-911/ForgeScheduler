const { ForgeClient, LogPriority } = require('@tryforge/forgescript')
const { ForgeScheduler } = require('../dist')
const path = require('path')

const client = new ForgeClient({
  extensions: [
    new ForgeScheduler()
  ],
    events: [
        'messageCreate'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: ['.']
})

client.commands.load('./__tests__/commands')

client.login('')
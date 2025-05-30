const { ForgeClient, LogPriority } = require('@tryforge/forgescript')
const { ForgeScheduler } = require('../dist')
const path = require('path')

const client = new ForgeClient({
  extensions: [
    new ForgeScheduler()
  ],
    events: [
        'messageCreate',
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: ['.']
})

client.commands.load('./__tests__/commands')

client.login('MTMzOTYyMTMzNjc3NDg3MzA4OA.GQwzMl.n-Val8ujzhol8k8E0e1lPq0f96zxXYVJE3NJ1I')
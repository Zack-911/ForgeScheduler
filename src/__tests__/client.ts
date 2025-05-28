import { ForgeClient, LogPriority } from "@tryforge/forgescript"
import { config } from "dotenv"
import { ForgeScheduler } from ".."
config()

const client = new ForgeClient({
    logLevel: LogPriority.High,
    intents: [
        "Guilds",
        "MessageContent",
        "GuildMessages",
        "GuildMembers",
        "DirectMessages",
        "GuildInvites",
        "GuildModeration",
        "GuildMessageReactions",
        "AutoModerationExecution"
    ],
    events: [
        "autoModerationActionExecution",
        "guildAuditLogEntryCreate",
        "ready",
        "messageCreate",
        "messageUpdate",
        "messageReactionAdd",
        "guildMemberAdd",
        "interactionCreate",
    ],
    prefixes: ["!"],
    extensions: [
        new ForgeScheduler()
    ],
    respondOnEdit: 10000,
})

client.commands.load(__dirname + "/commands")

// eslint-disable-next-line no-undef
client.login(process.env.TOKEN)

import { generateMetadata } from "@tryforge/forgescript"
import { ForgeSchedulerEventsName } from "./constants"

generateMetadata(
    __dirname + "/functions",
    "functions",
    ForgeSchedulerEventsName,
    undefined,
    undefined,
    __dirname + "/events"
)
import { Interpreter } from "@tryforge/forgescript";
import { ForgeScheduler } from "..";
import { ForgeSchedulerEventsNameHandler } from "../structures/ForgeSchedulerEventHandlers";

export default new ForgeSchedulerEventsNameHandler({
    name: "error",
    version: "1.0.0",
    description: "This event is called when an error occurs",
    listener(err) {
        const commands = this.getExtension(ForgeScheduler, true).commands.get("error")

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: err
            })
        }
    },
})
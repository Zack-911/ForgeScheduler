"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeSchedulerEventHandlers_1 = require("../structures/ForgeSchedulerEventHandlers");
exports.default = new ForgeSchedulerEventHandlers_1.ForgeSchedulerEventsNameHandler({
    name: "error",
    version: "1.0.0",
    description: "This event is called when an error occurs",
    listener(err) {
        const commands = this.getExtension(__1.ForgeScheduler, true).commands.get("error");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: err
            });
        }
    },
});
//# sourceMappingURL=error.js.map
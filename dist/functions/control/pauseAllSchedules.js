"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$pauseAllSchedules",
    version: "1.0.0",
    description: "Pauses all active schedules.",
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    execute(ctx) {
        if (!ctx.client.pausedSchedules)
            return this.customError("No schedules found");
        for (const jobID of ctx.client.pausedSchedules.keys()) {
            ctx.client.pausedSchedules.set(jobID, true);
        }
        return this.success(true);
    }
});
//# sourceMappingURL=pauseAllSchedules.js.map
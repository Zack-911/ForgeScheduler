"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$stopSchedule",
    version: "1.0.0",
    aliases: ["$deleteSchedule"],
    description: "Clears an active schedule, and returns a boolean",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [jobID]) {
        jobID = jobID.trim();
        const interval = ctx.client.intervals.get(jobID);
        clearInterval(interval);
        ctx.client.intervals.delete(jobID);
        return this.success(!!interval);
    }
});
//# sourceMappingURL=deleteSchedule.js.map
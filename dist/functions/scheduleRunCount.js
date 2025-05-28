"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getScheduleRuns",
    version: "1.0.0",
    description: "Returns how many times a schedule with the given jobID has run.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "jobID",
            description: "The ID of the scheduled job",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [jobID]) {
        const trimmed = jobID.trim();
        const count = ctx.client.scheduleCounts?.get(trimmed) ?? 0;
        return this.success(count);
    },
});
//# sourceMappingURL=scheduleRunCount.js.map
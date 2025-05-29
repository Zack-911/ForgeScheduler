"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$resumeSchedule",
    version: "1.0.0",
    description: "Resumes a paused schedule.",
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Boolean,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule to resume.",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        }
    ],
    async execute(ctx) {
        const jobID = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](jobID))
            return jobID;
        const trimmed = jobID.value.trim();
        if (!ctx.client.pausedSchedules?.has(trimmed)) {
            return this.customError("Schedule does not exist.");
        }
        ctx.client.pausedSchedules.set(trimmed, false);
        return this.success(true);
    },
});
//# sourceMappingURL=resumeSchedule.js.map
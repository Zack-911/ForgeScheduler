"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$scheduleRunCount",
    version: "1.0.0",
    description: "Returns how many times a schedule has run.",
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Number,
    args: [
        {
            name: "jobID",
            description: "The ID of the schedule",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        }
    ],
    async execute(ctx) {
        const jobID = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](jobID))
            return jobID;
        const trimmed = jobID.value.trim();
        const count = ctx.client.scheduleCounts?.get(trimmed) ?? 0;
        return this.success(count);
    },
});
//# sourceMappingURL=scheduleRunCount.js.map
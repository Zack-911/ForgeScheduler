"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$isSchedulePaused",
    version: "1.0.0",
    description: "Returns true if the schedule is paused.",
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Boolean,
    args: [
        {
            name: "jobID",
            description: "The schedule ID to check.",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx) {
        const id = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](id))
            return id;
        const trimmed = id.value.trim();
        return this.success(ctx.client.pausedSchedules?.get(trimmed) ?? false);
    }
});
//# sourceMappingURL=isSchedulePaused.js.map
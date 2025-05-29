"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$scheduleExists",
    version: "1.0.0",
    description: "Checks if a schedule with the given ID exists.",
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.Boolean,
    args: [
        {
            name: "jobID",
            description: "The job ID to check.",
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
        return this.success(ctx.client.scheduleData?.has(trimmed) ?? false);
    }
});
//# sourceMappingURL=scheduleExists.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$pausedSchedules",
    version: "1.0.0",
    description: "Returns an array of paused schedule IDs.",
    brackets: false,
    unwrap: false,
    output: forgescript_1.ArgType.String,
    args: [],
    async execute(ctx) {
        const result = [];
        for (const [id, paused] of ctx.client.pausedSchedules || []) {
            if (paused)
                result.push(id);
        }
        return this.success(JSON.stringify(result));
    }
});
//# sourceMappingURL=pausedSchedules.js.map
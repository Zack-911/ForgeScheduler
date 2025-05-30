"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteAllSchedules",
    version: "1.1.0",
    description: "Deletes all schedules",
    brackets: false,
    unwrap: false,
    output: forgescript_1.ArgType.Boolean,
    args: [],
    async execute(ctx) {
        ctx.client.scheduleData?.clear();
        ctx.client.scheduleCounts?.clear();
        ctx.client.pausedSchedules?.clear();
        ctx.client.remainingTimes?.clear();
        ctx.client.lastTick?.clear();
        for (const [id, timeout] of ctx.client.intervals ?? []) {
            clearTimeout(timeout);
        }
        ctx.client.intervals?.clear();
        return this.success(true);
    }
});
//# sourceMappingURL=deleteAllSchedules.js.map
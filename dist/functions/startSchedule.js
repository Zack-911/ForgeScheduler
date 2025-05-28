"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$startSchedule",
    version: "1.0.0",
    description: "Executes code after a given duration until canceled.",
    unwrap: false,
    brackets: true,
    output: forgescript_1.ArgType.Boolean,
    args: [
        {
            name: "code",
            description: "The code to execute.",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "time",
            description: "How long to wait before running this code.",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Time,
        },
        {
            name: "jobID",
            description: "The jobID for this interval.",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        }
    ],
    async execute(ctx) {
        if (!ctx.client.pausedSchedules)
            ctx.client.pausedSchedules = new Map();
        if (!ctx.client.remainingTimes)
            ctx.client.remainingTimes = new Map();
        if (!ctx.client.lastTick)
            ctx.client.lastTick = new Map();
        const code = this.data.fields[0];
        const time = await this["resolveUnhandledArg"](ctx, 1);
        if (!this["isValidReturnType"](time))
            return time;
        const jobID = await this["resolveUnhandledArg"](ctx, 2);
        if (!this["isValidReturnType"](jobID))
            return jobID;
        const jobIDStr = jobID.value.trim();
        if (!ctx.client.scheduleCounts)
            ctx.client.scheduleCounts = new Map();
        if (!ctx.client.pausedSchedules)
            ctx.client.pausedSchedules = new Map();
        ctx.client.scheduleCounts.set(jobIDStr, 0);
        ctx.client.pausedSchedules.set(jobIDStr, false);
        ctx.client.remainingTimes.set(jobIDStr, time.value);
        ctx.client.lastTick.set(jobIDStr, Date.now());
        const runJob = async () => {
            if (ctx.client.pausedSchedules.get(jobIDStr))
                return;
            const prevCount = ctx.client.scheduleCounts.get(jobIDStr) || 0;
            ctx.client.scheduleCounts.set(jobIDStr, prevCount + 1);
            await this["resolveCode"](ctx, code);
            ctx.client.remainingTimes.set(jobIDStr, time.value);
            ctx.client.lastTick.set(jobIDStr, Date.now());
        };
        const scheduleNext = () => {
            const remaining = ctx.client.remainingTimes.get(jobIDStr);
            ctx.client.lastTick.set(jobIDStr, Date.now());
            ctx.client.intervals.set(jobIDStr, setTimeout(async () => {
                await runJob();
                scheduleNext();
            }, remaining));
        };
        scheduleNext();
        return this.success(true);
    },
});
//# sourceMappingURL=startSchedule.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$editSchedule",
    description: "Edits an existing schedule’s code and/or interval. Can optionally restart the timer.",
    unwrap: false,
    brackets: true,
    output: forgescript_1.ArgType.Boolean,
    args: [
        {
            name: "code",
            description: "New code to execute (optional)",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: "time",
            description: "New interval (optional)",
            type: forgescript_1.ArgType.Time,
            required: false,
            rest: false,
        },
        {
            name: "jobID",
            description: "Schedule ID to update",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: "resetTime",
            description: "Restart timer now? true/false",
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
        },
    ],
    async execute(ctx) {
        const codeField = this.data.fields[0];
        const timeRet = await this["resolveUnhandledArg"](ctx, 1);
        if (!this["isValidReturnType"](timeRet))
            return timeRet;
        const jobIDRet = await this["resolveUnhandledArg"](ctx, 2);
        if (!this["isValidReturnType"](jobIDRet))
            return jobIDRet;
        const resetRet = await this["resolveUnhandledArg"](ctx, 3);
        if (!this["isValidReturnType"](resetRet))
            return resetRet;
        const jobIDStr = jobIDRet.value.trim();
        const existing = ctx.client.intervals.get(jobIDStr);
        if (!existing)
            return this.success(false);
        const timeVal = timeRet.value;
        const reset = resetRet.value === true;
        // Update scheduleData for next tick
        if (!ctx.client.scheduleData)
            ctx.client.scheduleData = new Map();
        ctx.client.scheduleData.set(jobIDStr, {
            code: codeField,
            time: timeVal ?? undefined
        });
        if (reset) {
            clearInterval(existing);
            ctx.client.intervals.delete(jobIDStr);
            ctx.client.scheduleCounts?.set(jobIDStr, 0);
            const interval = setInterval(async () => {
                const { code, time } = ctx.client.scheduleData.get(jobIDStr) ?? {};
                const prev = ctx.client.scheduleCounts.get(jobIDStr) || 0;
                ctx.client.scheduleCounts.set(jobIDStr, prev + 1);
                await this["resolveCode"](ctx, code || codeField);
            }, timeVal ?? 5000); // fallback to 5s
            ctx.client.intervals.set(jobIDStr, interval);
        }
        return this.success(true);
    },
});
//# sourceMappingURL=editSchedule.js.map
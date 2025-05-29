import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$deleteSchedule",
    version: "1.0.0",
    description: "Deletes a schedule and clears its interval.",
    brackets: true,
    unwrap: true,
    output: ArgType.Boolean,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule to delete.",
            rest: false,
            required: true,
            type: ArgType.String,
        }
    ],
    async execute(ctx) {
        const jobID: Return = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](jobID)) return jobID

        const trimmed = (jobID.value as string).trim()

        if (!ctx.client.intervals?.has(trimmed)) {
            return this.customError("Schedule does not exist.")
        }

        clearTimeout(ctx.client.intervals.get(trimmed))
        ctx.client.intervals.delete(trimmed)
        ctx.client.pausedSchedules?.delete(trimmed)
        ctx.client.remainingTimes?.delete(trimmed)
        ctx.client.lastTick?.delete(trimmed)
        ctx.client.scheduleCounts?.delete(trimmed)
        ctx.client.scheduleData?.delete(trimmed)

        return this.success(true)
    },
})

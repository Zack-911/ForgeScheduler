import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$scheduleNextRun",
    version: "1.0.0",
    description: "Returns the ms remaining until the next run of a schedule.",
    brackets: true,
    unwrap: true,
    output: ArgType.Number,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule.",
            rest: false,
            required: true,
            type: ArgType.String,
        }
    ],
    async execute(ctx) {
        if (!ctx.client.remainingTimes || !ctx.client.lastTick) return this.customError("No schedules found")

        const jobID: Return = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](jobID)) return jobID

        const trimmed = (jobID.value as string).trim()

        if (!ctx.client.remainingTimes.has(trimmed) || !ctx.client.lastTick.has(trimmed)) {
            return this.customError("Schedule does not exist.")
        }

        const remaining = ctx.client.remainingTimes.get(trimmed)
        const lastTick = ctx.client.lastTick.get(trimmed)
        if (remaining === undefined || lastTick === undefined) return this.customError("Invalid schedule data.")

        const elapsed = Date.now() - lastTick
        const msLeft = remaining - elapsed

        return this.success(msLeft > 0 ? msLeft : 0)
    }
})

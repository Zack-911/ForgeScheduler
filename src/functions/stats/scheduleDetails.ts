import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$scheduleDetails",
    version: "1.0.1",
    description: "Returns the details of a schedule with the given jobID as a JSON string.",
    brackets: true,
    unwrap: true,
    output: ArgType.String,
    args: [
        {
            name: "jobID",
            description: "The ID of the schedule",
            type: ArgType.String,
            required: true,
            rest: false,
        }
    ],
    async execute(ctx) {
        const jobID: Return = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](jobID)) return jobID
        const trimmed = (jobID.value as string).trim()
        const schedule = ctx.client.scheduleData?.get(trimmed)
        if (!schedule) return this.customError("Schedule does not exist.")
        const time = schedule.time ?? null
        const count = ctx.client.scheduleCounts?.get(trimmed) ?? 0
        const paused = ctx.client.pausedSchedules?.get(trimmed) ?? false
        const result = {
            jobID: trimmed,
            time,
            paused,
            runs: count
        }
        return this.success(JSON.stringify(result))
    },
})

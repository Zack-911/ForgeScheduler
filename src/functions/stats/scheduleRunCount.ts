import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$scheduleRunCount",
    version: "1.0.0",
    description: "Returns how many times a schedule has run.",
    brackets: true,
    unwrap: true,
    output: ArgType.Number,
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
        const count = ctx.client.scheduleCounts?.get(trimmed) ?? 0
        return this.success(count)
    },
})

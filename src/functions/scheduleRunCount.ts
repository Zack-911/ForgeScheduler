import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$getScheduleRuns",
    version: "1.0.0",
    description: "Returns how many times a schedule with the given jobID has run.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "jobID",
            description: "The ID of the scheduled job",
            required: true,
            rest: false,
            type: ArgType.String,
        },
    ],
    output: ArgType.Number,
    execute(ctx, [jobID]) {
        const trimmed = jobID.trim()
        const count = ctx.client.scheduleCounts?.get(trimmed) ?? 0
        return this.success(count)
    },
})

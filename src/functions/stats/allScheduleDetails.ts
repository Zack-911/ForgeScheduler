import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$allScheduleDetails",
    version: "1.0.0",
    description: "Returns an array of JSON objects representing all schedule details.",
    unwrap: false,
    output: ArgType.String,
    execute(ctx) {
        if (!ctx.client.scheduleData) return this.success("[]")

        const result = []

        for (const [jobID, data] of ctx.client.scheduleData.entries()) {
            const time = data.time ?? null
            const paused = ctx.client.pausedSchedules?.get(jobID) ?? false
            const runs = ctx.client.scheduleCounts?.get(jobID) ?? 0

            result.push({
                jobID,
                time,
                paused,
                runs
            })
        }

        return this.success(JSON.stringify(result))
    }
})

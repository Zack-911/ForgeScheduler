import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$resumeAllSchedules",
    version: "1.0.0",
    description: "Resumes all paused schedules.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        if (!ctx.client.pausedSchedules) return this.customError("No schedules found")

        for (const jobID of ctx.client.pausedSchedules.keys()) {
            ctx.client.pausedSchedules.set(jobID, false)
        }

        return this.success(true)
    }
})

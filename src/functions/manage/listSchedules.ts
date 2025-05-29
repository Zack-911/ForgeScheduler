import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$listSchedules",
    version: "1.0.0",
    description: "Returns a JSON array of all active schedule jobIDs.",
    unwrap: false,
    output: ArgType.String,
    execute(ctx) {
        if (!ctx.client.scheduleData) return this.success("[]")

        const allJobs = [...ctx.client.scheduleData.keys()]
        return this.success(JSON.stringify(allJobs))
    }
})

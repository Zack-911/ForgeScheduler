import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
 name: "$activeSchedules",
 version: "1.0.0",
 description: "Returns an array of active (not paused) schedule IDs.",
 brackets: false,
 unwrap: false,
 output: ArgType.String,
 args: [],
 async execute(ctx) {
     const result = []
     for (const [id, paused] of ctx.client.pausedSchedules || []) {
         if (!paused) result.push(id)
     }
     return this.success(JSON.stringify(result))
 }
})

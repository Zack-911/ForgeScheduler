import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
 name: "$isSchedulePaused",
 version: "1.0.0",
 description: "Returns true if the schedule is paused.",
 brackets: true,
 unwrap: true,
 output: ArgType.Boolean,
 args: [
     {
         name: "jobID",
         description: "The schedule ID to check.",
         type: ArgType.String,
         required: true,
         rest: false
     }
 ],
 async execute(ctx) {
     const id: Return = await this["resolveUnhandledArg"](ctx, 0)
     if (!this["isValidReturnType"](id)) return id

     const trimmed = (id.value as string).trim()
     return this.success(ctx.client.pausedSchedules?.get(trimmed) ?? false)
 }
})

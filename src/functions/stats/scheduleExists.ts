import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
 name: "$scheduleExists",
 version: "1.0.0",
 description: "Checks if a schedule with the given ID exists.",
 brackets: true,
 unwrap: true,
 output: ArgType.Boolean,
 args: [
     {
         name: "jobID",
         description: "The job ID to check.",
         type: ArgType.String,
         required: true,
         rest: false
     }
 ],
 async execute(ctx) {
     const id: Return = await this["resolveUnhandledArg"](ctx, 0)
     if (!this["isValidReturnType"](id)) return id

     const trimmed = (id.value as string).trim()
     return this.success(ctx.client.scheduleData?.has(trimmed) ?? false)
 }
})

import { Arg, ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$stopSchedule",
    version: "1.0.0",
    aliases: ["$deleteSchedule"],
    description: "Clears an active schedule, and returns a boolean",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    output: ArgType.Boolean,
    execute(ctx, [jobID]) {
      jobID = (jobID as string).trim()
      const interval = ctx.client.intervals.get(jobID)
      clearInterval(interval)
      ctx.client.intervals.delete(jobID)
      return this.success(!!interval)
    }
})
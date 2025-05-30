import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$deleteScheduleIn",
    version: "1.1.0",
  description: "Deletes a schedule after a delay",
  brackets: true,
  unwrap: true,
  output: ArgType.Boolean,
  args: [
    {
      name: "jobID",
      type: ArgType.String,
      required: true,
      rest: false,
      description: "Schedule ID to delete"
    },
    {
      name: "delay",
      type: ArgType.Time,
      required: true,
      rest: false,
      description: "Delay time before deletion"
    }
  ],
  async execute(ctx, [jobID, delay]) {
    const id = jobID.trim()
    if (!ctx.client.scheduleData?.has(id)) return this.customError(`Schedule "${id}" does not exist`)
    setTimeout(() => {
      clearTimeout(ctx.client.intervals.get(id))
      ctx.client.scheduleData?.delete(id)
      ctx.client.scheduleCounts?.delete(id)
      ctx.client.pausedSchedules?.delete(id)
      ctx.client.remainingTimes?.delete(id)
      ctx.client.lastTick?.delete(id)
      ctx.client.intervals?.get(id)?.refresh?.()
      ctx.client.intervals?.delete(id)
    }, delay)
    return this.success(true)
  }
})

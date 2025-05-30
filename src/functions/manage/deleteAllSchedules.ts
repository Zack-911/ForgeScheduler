import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$deleteAllSchedules",
    version: "1.1.0",
  description: "Deletes all schedules",
  brackets: false,
  unwrap: false,
  output: ArgType.Boolean,
  args: [],
  async execute(ctx) {
    ctx.client.scheduleData?.clear()
    ctx.client.scheduleCounts?.clear()
    ctx.client.pausedSchedules?.clear()
    ctx.client.remainingTimes?.clear()
    ctx.client.lastTick?.clear()
    for (const [id, timeout] of ctx.client.intervals ?? []) {
      clearTimeout(timeout)
    }
    ctx.client.intervals?.clear()
    return this.success(true)
  }
})

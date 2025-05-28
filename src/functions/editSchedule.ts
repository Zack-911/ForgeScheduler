import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$editSchedule",
    version: "1.0.0",
  description: "Edits an existing schedule’s code and/or interval. Can optionally restart the timer.",
  unwrap: false,
  brackets: true,
  output: ArgType.Boolean,
  args: [
    {
      name: "code",
      description: "New code to execute (optional)",
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: "time",
      description: "New interval (optional)",
      type: ArgType.Time,
      required: false,
      rest: false,
    },
    {
      name: "jobID",
      description: "Schedule ID to update",
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: "resetTime",
      description: "Restart timer now? true/false",
      type: ArgType.Boolean,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx) {
    const codeField = this.data.fields![0] as IExtendedCompiledFunctionField

    const timeRet: Return = await this["resolveUnhandledArg"](ctx, 1)
    if (!this["isValidReturnType"](timeRet)) return timeRet

    const jobIDRet: Return = await this["resolveUnhandledArg"](ctx, 2)
    if (!this["isValidReturnType"](jobIDRet)) return jobIDRet

    const resetRet: Return = await this["resolveUnhandledArg"](ctx, 3)
    if (!this["isValidReturnType"](resetRet)) return resetRet

    const jobIDStr = (jobIDRet.value as string).trim()
    const existing = ctx.client.intervals.get(jobIDStr)
    if (!existing) return this.success(false)

    const timeVal = timeRet.value as number | undefined
    const reset = resetRet.value === true

    // Update scheduleData for next tick
    if (!ctx.client.scheduleData) ctx.client.scheduleData = new Map()
    ctx.client.scheduleData.set(jobIDStr, {
      code: codeField,
      time: timeVal ?? undefined
    })

    if (reset) {
      clearInterval(existing)
      ctx.client.intervals.delete(jobIDStr)
      ctx.client.scheduleCounts?.set(jobIDStr, 0)

      const interval = setInterval(async () => {
        const { code, time } = ctx.client.scheduleData.get(jobIDStr) ?? {}
        const prev = ctx.client.scheduleCounts.get(jobIDStr) || 0
        ctx.client.scheduleCounts.set(jobIDStr, prev + 1)
        await this["resolveCode"](ctx, code || codeField)
      }, timeVal ?? 5000) // fallback to 5s

      ctx.client.intervals.set(jobIDStr, interval)
    }

    return this.success(true)
  },
})

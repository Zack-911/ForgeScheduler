import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$startScheduleAtTime",
  description: "Starts a schedule that runs every day at a specific time in a given timezone and optional days.",
  brackets: false,
  unwrap: false,
  output: ArgType.Boolean,
  args: [
    {
      name: "code",
      description: "The code to execute",
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: "time",
      description: "Time in 24-hour format (e.g., 14:30)",
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: "timezone",
      description: "Timezone like UTC+2 or GMT-5",
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: "jobID",
      description: "The job ID",
      type: ArgType.String,
      required: true,
      rest: false,
    }
  ],
  async execute(ctx) {
    const code = this.data.fields![0] as IExtendedCompiledFunctionField

    const timeArg: Return = await this["resolveUnhandledArg"](ctx, 1)
    if (!this["isValidReturnType"](timeArg)) return timeArg

    const tzArg: Return = await this["resolveUnhandledArg"](ctx, 2)
    if (!this["isValidReturnType"](tzArg)) return tzArg

    const idArg: Return = await this["resolveUnhandledArg"](ctx, 3)
    if (!this["isValidReturnType"](idArg)) return idArg

    const timeStr = (timeArg.value as string).trim()
    const tzStr = (tzArg.value as string).trim().toUpperCase()
    const jobID = (idArg.value as string).trim()

    if (!ctx.client.intervals) ctx.client.interval = new Map()
    if (ctx.client.intervals.has(jobID)) return this.customError(`Schedule with name ${jobID} already exists!`)

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr)) {
      return this.customError("Invalid time format")
    }

    const [hours, minutes] = timeStr.split(":").map(Number)

    let offsetMinutes = 0
    if (tzStr.startsWith("UTC") || tzStr.startsWith("GMT")) {
      const sign = tzStr.includes("+") ? 1 : -1
      const num = parseInt(tzStr.slice(3))
      if (isNaN(num)) return this.customError("Invalid timezone offset")
      offsetMinutes = sign * num * 60
    } else {
      return this.customError("Only UTC± or GMT± supported")
    }

    if (!ctx.client.scheduleCounts) ctx.client.scheduleCounts = new Map()
    if (!ctx.client.pausedSchedules) ctx.client.pausedSchedules = new Map()
    if (!ctx.client.scheduleData) ctx.client.scheduleData = new Map()

    ctx.client.scheduleCounts.set(jobID, 0)
    ctx.client.pausedSchedules.set(jobID, false)
    ctx.client.scheduleData.set(jobID, {
      time: hours * 3600000 + minutes * 60000,
      code,
      offset: offsetMinutes,
      atTime: timeStr,
      startClock: `${timeStr} ${tzStr}`,
      uneditable: true,
    })

    const run = async () => {
      if (ctx.client.pausedSchedules.get(jobID)) return
      const count = ctx.client.scheduleCounts.get(jobID) || 0
      ctx.client.scheduleCounts.set(jobID, count + 1)
      await this["resolveCode"](ctx, code)
    }

    const tick = async () => {
      const now = new Date()
      const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      const localTime = new Date(nowUtc.getTime() + offsetMinutes * 60000)

      const matchHour = localTime.getHours() === hours
      const matchMinute = localTime.getMinutes() === minutes
      const currentData = ctx.client.scheduleData.get(jobID)

      const dateKey = localTime.toISOString().split("T")[0]

      const shouldRun =
        matchHour &&
        matchMinute &&
        currentData?.lastRunDay !== dateKey

      if (shouldRun) {
        await run()
        ctx.client.scheduleData.set(jobID, { ...currentData, lastRunDay: dateKey })
        await new Promise(r => setTimeout(r, 60000))
      }

      const ref = setTimeout(tick, 5000)
      ctx.client.intervals.set(jobID, ref)
    }

    tick()

    return this.success(true)
  },
})

import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$startSchedule",
    version: "1.0.0",
    description: "Executes code after a given duration until canceled.",
    unwrap: false,
    brackets: true,
    output: ArgType.Boolean,
    args: [
        {
            name: "code",
            description: "The code to execute.",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "time",
            description: "How long to wait before running this code.",
            rest: false,
            required: true,
            type: ArgType.Time,
        },
        {
            name: "jobID",
            description: "The jobID for this interval.",
            rest: false,
            required: true,
            type: ArgType.String,
        }
    ],
    async execute(ctx) {
        if (!ctx.client.pausedSchedules) ctx.client.pausedSchedules = new Map()
        if (!ctx.client.remainingTimes) ctx.client.remainingTimes = new Map()
        if (!ctx.client.lastTick) ctx.client.lastTick = new Map()
        if (!ctx.client.scheduleCounts) ctx.client.scheduleCounts = new Map()
        if (!ctx.client.scheduleData) ctx.client.scheduleData = new Map()
        if (!ctx.client.intervals) ctx.client.interval = new Map()

        const code = this.data.fields![0] as IExtendedCompiledFunctionField
        const time: Return = await this["resolveUnhandledArg"](ctx, 1)
        if (!this["isValidReturnType"](time)) return time
        const jobID: Return = await this["resolveUnhandledArg"](ctx, 2)
        if (!this["isValidReturnType"](jobID)) return jobID

        const trimmed = (jobID.value as string).trim()
        if (ctx.client.intervals.has(trimmed)) return this.customError(`Schedule with name ${trimmed} already exists!`)


        ctx.client.scheduleCounts.set(trimmed, 0)
        ctx.client.pausedSchedules.set(trimmed, false)
        ctx.client.remainingTimes.set(trimmed, time.value as number)
        ctx.client.lastTick.set(trimmed, Date.now())
        ctx.client.scheduleData.set(trimmed, {
            code,
            time: time.value as number
        })

        const runJob = async () => {
            if (ctx.client.pausedSchedules.get(trimmed)) return

            const prevCount = ctx.client.scheduleCounts.get(trimmed) || 0
            ctx.client.scheduleCounts.set(trimmed, prevCount + 1)

            await this["resolveCode"](ctx, code)
            ctx.client.remainingTimes.set(trimmed, time.value as number)
            ctx.client.lastTick.set(trimmed, Date.now())
        }

        const scheduleNext = () => {
            const remaining = ctx.client.remainingTimes.get(trimmed)
            ctx.client.lastTick.set(trimmed, Date.now())

            ctx.client.intervals.set(trimmed,
                setTimeout(async () => {
                    await runJob()
                    scheduleNext()
                }, remaining)
            )
        }
        scheduleNext()
        return this.success(true)
    },
})

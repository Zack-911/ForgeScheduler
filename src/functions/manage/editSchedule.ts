import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$editSchedule",
    version: "1.0.0",
    description: "Edits an existing schedule's code and/or time without resetting stats.",
    brackets: true,
    unwrap: false,
    output: ArgType.Boolean,
    args: [
        {
            name: "jobID",
            description: "The ID of the schedule to edit",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "time",
            description: "New time interval (optional)",
            rest: false,
            required: false,
            type: ArgType.Time,
        },
        {
            name: "code",
            description: "New code to run (optional)",
            rest: false,
            required: false,
            type: ArgType.String,
        }
    ],
    async execute(ctx) {
        if (!ctx.client.scheduleData) ctx.client.scheduleData = new Map()
        if (!ctx.client.remainingTimes) ctx.client.remainingTimes = new Map()
        if (!ctx.client.lastTick) ctx.client.lastTick = new Map()
        if (!ctx.client.pausedSchedules) ctx.client.pausedSchedules = new Map()
        if (!ctx.client.scheduleCounts) ctx.client.scheduleCounts = new Map()

        const jobID: Return = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](jobID)) return jobID
        const trimmed = (jobID.value as string).trim()

        const schedule = ctx.client.scheduleData.get(trimmed)
        if (!schedule) return this.customError(`Schedule with ID "${trimmed}" does not exist.`)

        let timeArg: Return | null = null
        let newTime = schedule.time as number
        if (this.data.fields!.length > 1) {
            timeArg = await this["resolveUnhandledArg"](ctx, 1)
            if (timeArg && !this["isValidReturnType"](timeArg)) return timeArg
            if (timeArg && timeArg.value !== undefined) newTime = timeArg.value as number
        }

        let codeArg: Return | null = null
        let newCode: IExtendedCompiledFunctionField
        if (schedule.code) {
            newCode = schedule.code
        } else {
            return this.customError("Schedule is missing compiled code.")
        }
        if (this.data.fields!.length > 2) {
            codeArg = await this["resolveUnhandledArg"](ctx, 2)
            if (codeArg && !this["isValidReturnType"](codeArg)) return codeArg
            if (codeArg && codeArg.value !== undefined) {
                newCode = this.data.fields![2] as IExtendedCompiledFunctionField
            }
        }

        ctx.client.scheduleData.set(trimmed, {
            code: newCode,
            time: newTime
        })

        if (ctx.client.intervals.has(trimmed)) {
            clearTimeout(ctx.client.intervals.get(trimmed))
            ctx.client.intervals.delete(trimmed)
        }

        const firstInterval = timeArg ? newTime : ctx.client.remainingTimes.get(trimmed) ?? newTime
        ctx.client.remainingTimes.set(trimmed, newTime)
        ctx.client.lastTick.set(trimmed, Date.now())

        const runJob = async () => {
            if (ctx.client.pausedSchedules.get(trimmed)) return
            const prev = ctx.client.scheduleCounts.get(trimmed) || 0
            ctx.client.scheduleCounts.set(trimmed, prev + 1)
            await this["resolveCode"](ctx, newCode)
            ctx.client.remainingTimes.set(trimmed, newTime)
            ctx.client.lastTick.set(trimmed, Date.now())
        }

        const scheduleNext = () => {
            ctx.client.intervals.set(trimmed,
                setTimeout(async () => {
                    await runJob()
                    scheduleNext()
                }, firstInterval)
            )
        }

        scheduleNext()

        return this.success(true)
    }
})

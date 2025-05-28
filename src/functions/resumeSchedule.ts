import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$resumeSchedule",
    version: "1.0.0",
    description: "Resumes a paused schedule.",
    brackets: true,
    output: ArgType.Boolean,
    unwrap: true,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule to resume.",
            rest: false,
            required: true,
            type: ArgType.String,
        }
    ],
    async execute(ctx) {
        const jobID: Return = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](jobID)) return jobID;

        const jobIDStr = (jobID.value as string).trim();

        if (!ctx.client.pausedSchedules?.has(jobIDStr)) {
            return this.customError("Schedule does not exist.");
        }

        if (!ctx.client.pausedSchedules.get(jobIDStr)) {
            return this.customError("Schedule is not paused.");
        }

        ctx.client.pausedSchedules.set(jobIDStr, false);

        return this.success(true);
    },
});

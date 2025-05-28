import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";

export default new NativeFunction({
    name: "$pauseSchedule",
    version: "1.0.0",
    description: "Pauses an active schedule.",
    brackets: true,
    unwrap: true,
    output: ArgType.Boolean,
    args: [
        {
            name: "jobID",
            description: "The jobID of the schedule to pause.",
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

        ctx.client.pausedSchedules.set(jobIDStr, true);

        return this.success(true);
    },
});
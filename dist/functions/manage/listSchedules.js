"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$listSchedules",
    version: "1.0.0",
    description: "Returns a JSON array of all active schedule jobIDs.",
    unwrap: false,
    output: forgescript_1.ArgType.String,
    execute(ctx) {
        if (!ctx.client.scheduleData)
            return this.success("[]");
        const allJobs = [...ctx.client.scheduleData.keys()];
        return this.success(JSON.stringify(allJobs));
    }
});
//# sourceMappingURL=listSchedules.js.map
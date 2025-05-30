"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$findSchedules",
    version: "1.1.0",
    description: "Returns a list of schedule IDs containing a keyword",
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.String,
    args: [
        {
            name: "keyword",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
            description: "Keyword to search for"
        },
        {
            name: "max",
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
            description: "Maximum results"
        }
    ],
    async execute(ctx, [keyword, max]) {
        if (!ctx.client.scheduleData)
            return this.success("[]");
        const key = keyword.toLowerCase();
        const list = Array.from(ctx.client.scheduleData.keys());
        const found = list.filter(id => id.toLowerCase().includes(key));
        const limit = max ?? found.length;
        return this.success(JSON.stringify(found.slice(0, limit)));
    }
});
//# sourceMappingURL=findSchedules.js.map
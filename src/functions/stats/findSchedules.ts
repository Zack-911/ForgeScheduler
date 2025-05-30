import { ArgType, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$findSchedules",
    version: "1.1.0",
  description: "Returns a list of schedule IDs containing a keyword",
  brackets: true,
  unwrap: true,
  output: ArgType.String,
  args: [
    {
      name: "keyword",
      type: ArgType.String,
      required: true,
      rest: false,
      description: "Keyword to search for"
    },
    {
      name: "max",
      type: ArgType.Number,
      required: false,
      rest: false,
      description: "Maximum results"
    }
  ],
  async execute(ctx, [keyword, max]) {
    if (!ctx.client.scheduleData) return this.success("[]")
    const key = keyword.toLowerCase()
    const list = Array.from(ctx.client.scheduleData.keys())
    const found = list.filter(id => id.toLowerCase().includes(key))
    const limit = max ?? found.length
    return this.success(JSON.stringify(found.slice(0, limit)))
  }
})

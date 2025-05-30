import fs from "fs"
import path from "path"

type MetadataArg = {
  name: string
  description: string
  required: boolean
  rest: boolean
  type: string
}

type MetadataEntry = {
  name: string
  version: string
  description: string
  output: string[]
  unwrap: boolean
  brackets?: boolean
  category: string
  args?: MetadataArg[]
}

export function generateDocsFromMetadata(filePath: string): string {
  const raw = fs.readFileSync(path.resolve(filePath), "utf-8")
  const metadata: MetadataEntry[] = JSON.parse(raw)

  const grouped = new Map<string, MetadataEntry[]>()

  for (const entry of metadata) {
    if (!grouped.has(entry.category)) grouped.set(entry.category, [])
    grouped.get(entry.category)!.push(entry)
  }

  let output = "# ForgeScheduler Native Functions\n\n"

  for (const [category, entries] of grouped) {
    output += `## ${category[0].toUpperCase()}${category.slice(1)}\n\n`

    for (const entry of entries) {
      output += `### ${entry.name} (v${entry.version})\n`
      output += `${entry.description}\n\n`

      if (entry.args && entry.args.length > 0) {
        output += `**Arguments:**\n\n`
        for (const arg of entry.args) {
          const req = arg.required ? "required" : "optional"
          output += `- \`${arg.name}\` (${arg.type}, ${req}) - ${arg.description}\n`
        }
        output += `\n`
      }

      output += `**Returns:** \`${entry.output.join(" | ")}\`\n`
      output += `**Brackets:** \`${entry.brackets ?? false}\`\n`
      output += `**Unwrap:** \`${entry.unwrap}\`\n\n`
    }
  }

  return output
}

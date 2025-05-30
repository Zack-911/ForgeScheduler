"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocsFromMetadata = generateDocsFromMetadata;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateDocsFromMetadata(filePath) {
    const raw = fs_1.default.readFileSync(path_1.default.resolve(filePath), "utf-8");
    const metadata = JSON.parse(raw);
    const grouped = new Map();
    for (const entry of metadata) {
        if (!grouped.has(entry.category))
            grouped.set(entry.category, []);
        grouped.get(entry.category).push(entry);
    }
    let output = "# ForgeScheduler Native Functions\n\n";
    for (const [category, entries] of grouped) {
        output += `## ${category[0].toUpperCase()}${category.slice(1)}\n\n`;
        for (const entry of entries) {
            output += `### ${entry.name} (v${entry.version})\n`;
            output += `${entry.description}\n\n`;
            if (entry.args && entry.args.length > 0) {
                output += `**Arguments:**\n\n`;
                for (const arg of entry.args) {
                    const req = arg.required ? "required" : "optional";
                    output += `- \`${arg.name}\` (${arg.type}, ${req}) - ${arg.description}\n`;
                }
                output += `\n`;
            }
            output += `**Returns:** \`${entry.output.join(" | ")}\`\n`;
            output += `**Brackets:** \`${entry.brackets ?? false}\`\n`;
            output += `**Unwrap:** \`${entry.unwrap}\`\n\n`;
        }
    }
    return output;
}
//# sourceMappingURL=generateMdFunctions.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const generateMdFunctions_1 = require("./generateMdFunctions");
const fs_1 = __importDefault(require("fs"));
(0, forgescript_1.generateMetadata)(__dirname + "/functions", "functions");
const docs = (0, generateMdFunctions_1.generateDocsFromMetadata)("./metadata/functions.json");
fs_1.default.writeFileSync("./metadata/functions.md", docs);
//# sourceMappingURL=docgen.js.map
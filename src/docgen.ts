import { generateMetadata } from "@tryforge/forgescript"
import { generateDocsFromMetadata } from "./generateMdFunctions"
import fs from "fs"
generateMetadata(
    __dirname + "/functions",
    "functions",
)

const docs = generateDocsFromMetadata("./metadata/functions.json")
fs.writeFileSync("./metadata/functions.md", docs)

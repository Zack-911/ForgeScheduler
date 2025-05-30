"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeScheduler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class ForgeScheduler extends forgescript_1.ForgeExtension {
    name = "forge.scheduler";
    description = "Extension for scheduling repeated tasks.";
    version = require("../package.json").version;
    instance;
    config;
    commands;
    init(client) {
        this.instance = client;
        this.load(__dirname + "/functions");
    }
}
exports.ForgeScheduler = ForgeScheduler;
//# sourceMappingURL=index.js.map
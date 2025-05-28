"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeScheduler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("./constants");
const ForgeSchedulerCommandManager_1 = require("./structures/ForgeSchedulerCommandManager");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
class ForgeScheduler extends forgescript_1.ForgeExtension {
    name = "forge.scheduler";
    description = "Scheduler.";
    version = require("../package.json").version;
    client;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    commands;
    options;
    init(client) {
        this.client = client;
        this.commands = new ForgeSchedulerCommandManager_1.ForgeSchedulerCommandManager(client);
        forgescript_1.EventManager.load(constants_1.ForgeSchedulerEventsName, __dirname + `/events`);
        this.load(__dirname + `/functions`);
        client.pausedSchedules = new Map();
        client.scheduleCounts = new Map();
        client.lastTick = new Map();
        client.remainingTimes = new Map();
    }
}
exports.ForgeScheduler = ForgeScheduler;
//# sourceMappingURL=index.js.map
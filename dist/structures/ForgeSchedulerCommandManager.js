"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeSchedulerCommandManager = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("../constants");
class ForgeSchedulerCommandManager extends forgescript_1.BaseCommandManager {
    handlerName = constants_1.ForgeSchedulerEventsName;
}
exports.ForgeSchedulerCommandManager = ForgeSchedulerCommandManager;
//# sourceMappingURL=ForgeSchedulerCommandManager.js.map
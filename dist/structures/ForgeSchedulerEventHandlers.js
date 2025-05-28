"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeSchedulerEventsNameHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class ForgeSchedulerEventsNameHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        // @ts-ignore
        client.getExtension(ForgeTopGG, true)["emitter"].on(this.name, this.listener.bind(client));
    }
}
exports.ForgeSchedulerEventsNameHandler = ForgeSchedulerEventsNameHandler;
//# sourceMappingURL=ForgeSchedulerEventHandlers.js.map
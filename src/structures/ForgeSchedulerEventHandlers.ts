import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { ForgeScheduler } from "..";

export interface IForgeSchedulerEvents {
    error: [ Error ]
}

export class ForgeSchedulerEventsNameHandler<T extends keyof IForgeSchedulerEvents> extends BaseEventHandler<IForgeSchedulerEvents, T> {
    register(client: ForgeClient): void {
        // @ts-ignore
        client.getExtension(ForgeTopGG, true)["emitter"].on(this.name, this.listener.bind(client))
    }
}
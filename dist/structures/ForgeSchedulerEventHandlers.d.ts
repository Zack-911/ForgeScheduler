import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
export interface IForgeSchedulerEvents {
    error: [Error];
}
export declare class ForgeSchedulerEventsNameHandler<T extends keyof IForgeSchedulerEvents> extends BaseEventHandler<IForgeSchedulerEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=ForgeSchedulerEventHandlers.d.ts.map
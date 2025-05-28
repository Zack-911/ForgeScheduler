import { EventManager, ForgeClient, ForgeExtension, IExtendedCompiledFunctionField } from "@tryforge/forgescript";
import { ForgeSchedulerEventsName } from "./constants";
import { ForgeSchedulerCommandManager } from "./structures/ForgeSchedulerCommandManager";
import { IForgeSchedulerEvents } from "./structures/ForgeSchedulerEventHandlers";
import { TypedEmitter } from "tiny-typed-emitter";
import { PausedSchedules } from "./types";
export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never
}

export class ForgeScheduler extends ForgeExtension {
    name = "forge.scheduler"
    description = "Scheduler."
    version = require("../package.json").version

    private client!: ForgeClient
    private emitter = new TypedEmitter<TransformEvents<IForgeSchedulerEvents>>()

    public commands!: ForgeSchedulerCommandManager
  options: any;

    init(client: ForgeClient): void {
        this.client = client
        this.commands = new ForgeSchedulerCommandManager(client)

        EventManager.load(ForgeSchedulerEventsName, __dirname + `/events`)
        this.load(__dirname + `/functions`)
        client.pausedSchedules = new Map();
        client.scheduleCounts = new Map();
        client.lastTick = new Map();
        client.remainingTimes = new Map();

    }
}

declare module "@tryforge/forgescript" {
  interface ForgeClient {
    scheduleCounts: Map<string, number>;
    pausedSchedules: Map<string, boolean>;
    remainingTimes: Map<string, number>;
    lastTick: Map<string, number>;
    scheduleData: Map<
      string,
      {
        pausedSchedules?: PausedSchedules;
        scheduleCounts?: Map<string, number>;
        code?: IExtendedCompiledFunctionField;
        time?: number;
      }
    >;
  }
}

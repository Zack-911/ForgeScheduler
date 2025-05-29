import {
    ForgeExtension,
    ForgeClient,
    IExtendedCompiledFunctionField
} from "@tryforge/forgescript"
import { PausedSchedules } from "./types"


export class ForgeScheduler extends ForgeExtension {
    name = "forge.scheduler"
    description = "Extension for scheduling repeated tasks."
    version = require("../package.json").version

    private instance!: ForgeClient

    config: any
    commands: any

    init(client: ForgeClient): void {
        this.instance = client

        this.load(__dirname + "/functions")
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

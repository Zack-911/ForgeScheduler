import { ForgeExtension, ForgeClient, IExtendedCompiledFunctionField } from "@tryforge/forgescript";
import { PausedSchedules } from "./types";
export declare class ForgeScheduler extends ForgeExtension {
    name: string;
    description: string;
    version: any;
    private instance;
    config: any;
    commands: any;
    init(client: ForgeClient): void;
}
declare module "@tryforge/forgescript" {
    interface ForgeClient {
        scheduleCounts: Map<string, number>;
        pausedSchedules: Map<string, boolean>;
        remainingTimes: Map<string, number>;
        lastTick: Map<string, number>;
        scheduleData: Map<string, {
            pausedSchedules?: PausedSchedules;
            scheduleCounts?: Map<string, number>;
            code?: IExtendedCompiledFunctionField;
            time?: number;
        }>;
    }
}
//# sourceMappingURL=index.d.ts.map
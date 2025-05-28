import { BaseCommandManager } from "@tryforge/forgescript";
import { IForgeSchedulerEvents } from "./ForgeSchedulerEventHandlers";
import { ForgeSchedulerEventsName } from "../constants";

export class ForgeSchedulerCommandManager extends BaseCommandManager<keyof IForgeSchedulerEvents> {
    handlerName = ForgeSchedulerEventsName
}
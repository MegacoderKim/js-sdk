import { IAnalyticsItemService } from "../interfaces/analytics-item";
import { ActionsAnalyticsListComponent } from "./actions-analytics-list.component";
import { IAnalyticsListConfig } from "../interfaces/analytics-list";
import { UsersAnalyticsListComponent } from "../users-analytics-list/users-analytics-list.component";
import { ActionsList } from "ht-client";
export declare class ActionsAnalyticsListService implements IAnalyticsItemService {
    component: typeof ActionsAnalyticsListComponent;
    className: string;
    tags: string[];
    dateRangeService$: any;
    title: any;
    tableFormat: any;
    query: any;
    columns: any;
    client: ActionsList;
    dataArray$: any;
    dataTable$: any;
    hideDatePicker: boolean;
    noData: boolean;
    loading$: any;
    constructor(config: IAnalyticsListConfig);
    initState(config: IAnalyticsListConfig): void;
    private initClient(config);
    setData(instance: UsersAnalyticsListComponent): void;
    setActive(isActive?: boolean): void;
}

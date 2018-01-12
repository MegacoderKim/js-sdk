import { IAnalyticsListConfig } from "../interfaces/analytics-list";
import { UsersAnalytics } from "ht-client";
import { IAnalyticsItemService } from "../interfaces/analytics-item";
import { UsersAnalyticsListComponent } from "./users-analytics-list.component";
export declare class UsersAnalyticsListService implements IAnalyticsItemService {
    component: typeof UsersAnalyticsListComponent;
    dateRangeService$: any;
    title: any;
    tableFormat: any;
    query: any;
    columns: any;
    client: UsersAnalytics;
    dataArray$: any;
    dataTable$: any;
    className: string;
    tags: string[];
    hideDatePicker: boolean;
    noData: any;
    loading$: any;
    constructor(config: IAnalyticsListConfig);
    initState(config: IAnalyticsListConfig): void;
    private initClient(config);
    setData(instance: UsersAnalyticsListComponent): void;
    setActive(isActive?: boolean): void;
}

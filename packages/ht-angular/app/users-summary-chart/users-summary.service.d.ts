import { IAnalyticsItemService } from "../interfaces/analytics-item";
import { UsersSummaryChartComponent } from "./users-summary-chart.component";
import { ISummaryConfig } from "../interfaces/users-analytics";
import { HtUsersClient } from "ht-client";
export declare class UsersSummaryService implements IAnalyticsItemService {
    component: typeof UsersSummaryChartComponent;
    className: string;
    tags: string[];
    dateRangeService$: any;
    title: string;
    client: any;
    summary$: any;
    hideDatePicker: boolean;
    noData: boolean;
    loading$: any;
    minHeight: number;
    constructor(config: ISummaryConfig<HtUsersClient>);
    setData(instance: UsersSummaryChartComponent): void;
    private setState(config);
    destroy(): void;
    setActive(isActive?: boolean): void;
}
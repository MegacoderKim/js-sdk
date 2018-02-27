import {QueryLabel, UsersSummaryClient} from "ht-client";
// import {IDateRange} from "ht-models";
// import {HtUsersClient} from "ht-client";
// import {HtActionsClient} from "ht-client/dist/typings/entities/actions/actions-client";
import {DateRange} from "ht-client";

export interface ISummaryConfig<T> {
  tags?: string[],
  title?: string
  // initialDateRange?: IDateRange,
  client?: T,
  dateRangeService?: DateRange,
  queryLabels?: QueryLabel[]
}

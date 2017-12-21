import {QueryLabel, UsersSummaryClient} from "ht-client";
import {IDateRange} from "ht-models";
import {HtUsersClient} from "ht-client";

export interface IUsersSummaryConfig {
  tags?: string[],
  title?: string
  // initialDateRange?: IDateRange,
  usersClient?: HtUsersClient,
  queryLabels?: QueryLabel[]
}

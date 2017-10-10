import {
  EntityList, EntityListDispatchers, EntityListSelectors, EntityTypeConfig, ListDispatchers, ListSelectors,
  ListState
} from "../base/arc";
import {Observable} from "rxjs/Observable";

export interface AddUsersAnalyticsSelector {

}

export interface AddUsersAnalyticsDispatchers {

}

export interface UsersAnalyticsSelector extends AddUsersAnalyticsSelector, EntityListSelectors, ListSelectors {

}

export interface UsersAnalyticsDispatchers extends AddUsersAnalyticsDispatchers, EntityListDispatchers, ListDispatchers {

}

export interface UsersAnalytics extends EntityList {
  selectors: UsersAnalyticsSelector,
  dispatchers: UsersAnalyticsDispatchers
}

export type UsersAnalyticsFactory = (listEntityState: ListState, config: Partial<EntityTypeConfig>) => UsersAnalytics
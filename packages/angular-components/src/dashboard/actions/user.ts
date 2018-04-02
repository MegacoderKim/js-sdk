import {Action} from "@ngrx/store";
import {
    IPlaceline, IUser, IUserPlaceline, IUserListSummary, IUserAnalyticsPage, IUserPlace,
    IUserAnalytics, IPlaceHeat
} from "ht-models";
import {Partial} from "ht-models";


// export const SELECT_SEGMENTS = '[USER] Select Segments';
// export const UPDATE_SEGMENTS = '[USER] Update Segments';
export const CLEAR_SEGMENTS = '[USER] Clear Segments';
export const SELECT_SEGMENT = '[USER] Select Segment';
export const SELECT_PARTIAL_SEGMENT = '[USER] Select Partial Segment';
export const CLEAR_PARTIAL_SEGMENT = '[USER] Clear Partial Segment';
export const CLEAR_SEGMENT = '[USER] Clear Segment';
export const UPDATE_USERS_MAP = '[USER] Update Users Map';
export const ADD_USERS_MAP = '[USER] Add Users Map';
export const ADD_FILTER_USERS_MAP = '[USER] Add Filter Users Map';
export const CLEAR_USERS_MAP = '[USER] Clear Users Map';
export const SET_USER_FILTER = '[USER] Set Users Filter';
export const SELECT_USER_ID = '[USER] Set User Id';
export const SELECT_USER_ID_PLACE = '[USER] Set User Id Place';
export const SELECT_USER_DATA = '[USER] Set User Data';
export const UPDATE_USER_DATA = '[USER] Update User Data';
export const SELECT_EVENT_ID = '[USER] Select User Event';
export const CLEAR_EVENT_ID = '[USER] Clear User Action';
export const SELECT_ACTION_ID = '[USER] Select User Action Id';
export const CLEAR_ACTION_ID = '[USER] Clear User Event';
// export const SELECT_SEGMENT_DATE = '[USER] Set Segment Date';
export const SELECT_TIMELINE_QUERY = '[USER] Set Timeline Query';
export const SELECT_USER_ACTION = '[USER] Select User Action';
export const CLEAR_USER = '[USER] Clear User';
export const SET_SUMMARY = '[USER] Set User Summary';
export const SET_PAGE_DATA = '[USER] Set User Page Data';
export const UPDATE_PAGE_DATE = '[USER] Update User Page Data';
export const SET_USER_PLACE = '[USER] Set User Place';
export const SET_SELECTED_USER_PLACE = '[USER] Set Selected User Place';
export const CLEAR_SELECTED_USER_PLACE = '[USER] Clear Selected User Place';
export const UPDATE_USER_PLACE = '[USER] Update User Place';
export const CLEAR_USER_PLACE = '[USER] Clear User Place';
export const SET_FILTER_USER_PLACE = '[USER] Set Filter User Place';


export class SelectSegmentAction implements Action {
    readonly type = SELECT_SEGMENT;
    constructor(public payload: string) { }

}

export class SelectPartialSegmentAction implements Action {
    readonly type = SELECT_PARTIAL_SEGMENT;
    constructor(public payload: string) { }

}

export class ClearPartialSegmentAction implements Action {
    readonly type = CLEAR_PARTIAL_SEGMENT;
    constructor() { }

}

export class ClearSegmentAction implements Action {
    readonly type = CLEAR_SEGMENT;

}

export class UpdateUsersMapAction implements Action {
    readonly type = UPDATE_USERS_MAP;
    constructor(public payload: IUserAnalytics[]) { }
}

export class AddUsersMapAction implements Action {
    readonly type = ADD_USERS_MAP;
    constructor(public payload: IUserAnalytics[]) { }
}

export class AddFilterUsersMapAction implements Action {
    readonly type = ADD_FILTER_USERS_MAP;
    constructor(public payload: IUserAnalytics[]) { }
}

export class ClearUsersMapAction implements Action {
    readonly type = CLEAR_USERS_MAP;
}

export class SetUsersMapFilterAction implements Action {
    readonly type = SET_USER_FILTER;

    constructor(public payload: (userMap: IUserAnalytics) => boolean) {}
}

export class SelectUserIdAction implements Action {
    readonly type = SELECT_USER_ID;

    constructor(public payload: string) {}
}

export class SelectUserIdPlaceAction implements Action {
    readonly type = SELECT_USER_ID_PLACE;

    constructor(public payload: string) {}
}

export class SelectUserDataAction implements Action {
    readonly type = SELECT_USER_DATA;

    constructor(public payload: IUserPlaceline) {}
}

export class UpdateUserDataAction implements Action {
    readonly type = UPDATE_USER_DATA;

    constructor(public payload: IUserPlaceline) {}
}

export class SelectUserActionAction implements Action {
    readonly type = SELECT_USER_ACTION;

    constructor(public payload: {actionId: string, userId: string}) {}
}

// export class SelectSegmentDateAction implements Action {
//     readonly type = SELECT_SEGMENT_DATE;
//
//     constructor(public payload: string) {}
// }

export class SelectTimelineQueryAction implements Action {
    readonly type = SELECT_TIMELINE_QUERY;

    constructor(public payload: {
      date?: string,
      action_id?: string,
      action_unique_id?: string
      action_collection_id?: string
    }) {}
}

export class ClearUserAction implements Action {
    readonly type = CLEAR_USER;

}

export class SelectUserEventId implements Action {
    readonly type = SELECT_EVENT_ID;

    constructor(public payload: string) {}
}

export class ClearUserEventId implements Action {
    readonly type = CLEAR_EVENT_ID;
}

export class SelectUserActionId implements Action {
    readonly type = SELECT_ACTION_ID;

    constructor(public payload: string) {}
}

export class ClearUserActionId implements Action {
    readonly type = CLEAR_ACTION_ID;
}

export class SetUserSummary implements Action {
    readonly type = SET_SUMMARY;

    constructor(public payload: IUserListSummary) {}
}

export class SetUserPageData implements Action {
    readonly type = SET_PAGE_DATA;

    constructor(public payload: IUserAnalyticsPage) {}
}

export class UpdateUserPageData implements Action {
    readonly type = UPDATE_PAGE_DATE;

    constructor(public payload: IUserAnalyticsPage) {}
}

export class SetUserPlace implements Action {
    readonly type = SET_USER_PLACE;

    constructor(public payload: IPlaceHeat[]) {}
}

export class SetSelectedUserPlace implements Action {
    readonly type = SET_SELECTED_USER_PLACE;

    constructor(public payload: IPlaceHeat[]) {}
}

export class UpdateUserPlace implements Action {
    readonly type = UPDATE_USER_PLACE;

    constructor(public payload: IPlaceHeat[]) {}
}

export class SetFilterUserPlace implements Action {
    readonly type = SET_FILTER_USER_PLACE;

    constructor(public payload: (IPlaceHeat) => boolean) {}
}

export class ClearUserPlace implements Action {
    readonly type = CLEAR_USER_PLACE;

}

export class ClearSelectedUserPlace implements Action {
    readonly type = CLEAR_SELECTED_USER_PLACE;

}

export type Actions
    = SelectSegmentAction
    | SelectPartialSegmentAction
    | ClearPartialSegmentAction
    | ClearSegmentAction
    | UpdateUsersMapAction
    | AddUsersMapAction
    | AddFilterUsersMapAction
    | ClearUsersMapAction
    | SetUsersMapFilterAction
    | SelectUserIdAction
    | SelectUserIdPlaceAction
    | SelectUserDataAction
    | UpdateUserDataAction
    | SelectTimelineQueryAction
    | SelectUserActionAction
    | ClearUserAction
    | SelectUserEventId
    | ClearUserEventId
    | SelectUserActionId
    | ClearUserActionId
    | SetUserSummary
    | SetUserPageData
    | UpdateUserPageData
    | SetUserPlace
    | SetSelectedUserPlace
    | UpdateUserPlace
    | SetFilterUserPlace
    | ClearUserPlace
    | ClearSelectedUserPlace

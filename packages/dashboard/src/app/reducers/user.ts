import * as fromUser from "../actions/user";
import {IPageData, IPlaceHeat, IPlaceline, IUserAnalytics, IUserPlaceline} from "ht-models";
import * as _ from 'underscore';
import { createSelector } from "@ngrx/store";
import {Partial} from "ht-models";
import {htUser} from "ht-data";

const initialState: State = {
    selectedSegmentId: null,
  selectedPartialSegment: null,
    usersMapEntity: {},
    selectedUserId: null,
    selectedUserIdPlace: null,
    selectedUser: null,
    selectedSegmentDate: null,
    selectedSegmentActionId: null,
    selectedEventId: null,
    selectedActionId: null,
    timelineQuery: { },
    filterMap: () => true,
    userPlaceEntity: {},
    selectedUserPlaceEntity: {},
    filterPlace: () => true,
};

export interface State {
    selectedSegmentId: string | null,
    usersMapEntity: {
        [id: string]: IUserAnalytics
    },
  selectedPartialSegment: string,
    timelineQuery: {
        date?: string,
        action_id?: string,
        action_lookup_id?: string
        action_collection_id?: string
    },
    selectedUserId: string | null,
    selectedUserIdPlace: string | null,
    selectedUser: IUserPlaceline | null,
    selectedSegmentDate: string | null,
    selectedSegmentActionId: string | null,
    selectedEventId: string | null,
    selectedActionId: string | null,
    filterMap: (userMap: IUserAnalytics) => boolean,
    summary?: object;
    pageData?: IPageData,
    userPlaceEntity:{
        [id: string]: IPlaceHeat
    },
    selectedUserPlaceEntity:{
        [id: string]: IPlaceHeat
    },
    filterPlace:(userMap: IPlaceHeat) => boolean,
}

export function userReducer(state: State = initialState, action : fromUser.Actions): State {
    // console.log(action);
    switch (action.type) {
        case fromUser.SELECT_USER_ID: {
            return {...state, selectedUserId: action.payload, selectedPartialSegment: null}
        }
        case fromUser.SELECT_USER_DATA: {
            return {...state, selectedUser: action.payload, timelineQuery: {...state.timelineQuery, date: action.payload.timeline_date}}
        }
        case fromUser.UPDATE_USER_DATA: {
            return {...state, selectedUser: action.payload, timelineQuery: {...state.timelineQuery, date: action.payload.timeline_date}}
        }
      case fromUser.SELECT_PARTIAL_SEGMENT: {
        return {...state, selectedPartialSegment: action.payload, selectedSegmentId: null, selectedActionId: null}
      }
      case fromUser.CLEAR_PARTIAL_SEGMENT: {
        return {...state, selectedPartialSegment: null}
      }
        case fromUser.SELECT_TIMELINE_QUERY: {
            return {...state, timelineQuery: {...state.timelineQuery, ...action.payload}}
        }
        case fromUser.CLEAR_USER: {
            return {...state, selectedUser: null, selectedUserId: null, selectedEventId: null, timelineQuery: {}, selectedPartialSegment: null}
        }
        case fromUser.SELECT_SEGMENT: {
            return state.selectedPartialSegment ? state : {...state, selectedSegmentId: action.payload}
        }
        case fromUser.SELECT_USER_ACTION: {
            return {...state, selectedUserId: action.payload.userId, timelineQuery: {action_id: action.payload.actionId}}
        }
        case fromUser.CLEAR_SEGMENT: {
            return {...state, selectedSegmentId: null}
        }
        case fromUser.SELECT_EVENT_ID: {
            return {...state, selectedEventId: action.payload}
        }
        case fromUser.CLEAR_EVENT_ID: {
            return {...state, selectedEventId: null}
        }
        case fromUser.UPDATE_USERS_MAP: {
            let userMapEntity = _.indexBy(action.payload, 'id');
            return {...state, usersMapEntity: userMapEntity}
        }
        case fromUser.ADD_USERS_MAP: {
            let userMapEntity = _.indexBy(action.payload, 'id');
            return {...state, usersMapEntity: {...state.usersMapEntity, ...userMapEntity}}
        }
        case fromUser.ADD_FILTER_USERS_MAP: {
            let usersArray = _.values(state.usersMapEntity);
            let users = _.reject(usersArray, state.filterMap);
            let userMapEntity = _.indexBy([...users, ...action.payload], 'id');
            return {...state, usersMapEntity: userMapEntity}
        }
        case fromUser.CLEAR_USERS_MAP: {
            return {...state, usersMapEntity: {}}
        }
        case fromUser.SET_USER_FILTER: {
          return {...state, filterMap: action.payload}
        }
        case fromUser.SELECT_ACTION_ID: {
            return state.selectedPartialSegment ? state :  {...state, selectedActionId: action.payload}
        }
        case fromUser.CLEAR_ACTION_ID: {
            return {...state, selectedActionId: null}
        }
        case fromUser.SET_SUMMARY: {
            return {...state, summary: action.payload}
        }
        case fromUser.SET_PAGE_DATA: {
            return {...state, pageData: action.payload}
        }
        case fromUser.SET_USER_PLACE: {
            let userPlaceEntity = _.indexBy(action.payload, 'place_id');
            return {...state, userPlaceEntity: userPlaceEntity}
            // return {...state, userPlaceEntity: userPlaceEntity}
        }
        case fromUser.SET_SELECTED_USER_PLACE: {
            let userPlaceEntity = _.indexBy(action.payload, 'place_id');
            return {...state, selectedUserPlaceEntity: userPlaceEntity}
        }
        case fromUser.UPDATE_USER_PLACE: {
            let userPlaceEntity = _.indexBy(action.payload, 'place_id');
            return {...state, userPlaceEntity: {...state.userPlaceEntity, ...userPlaceEntity}}
        }
        case fromUser.SET_FILTER_USER_PLACE: {
            return {...state, filterPlace: action.payload}
        }
        case fromUser.CLEAR_USER_PLACE: {
            return {...state, userPlaceEntity: {}, filterPlace: () => true}
        }
        case fromUser.CLEAR_SELECTED_USER_PLACE: {
            return {...state, selectedUserPlaceEntity: {}, selectedUserIdPlace: null}
        }
        default: {
            return state
        }
    }
}

// export const getSegmentsEntity = (state: State) => state.segmentEntity;

export const getSelectedUserId = (state: State) => state.selectedUserId;

export const getSegments = (state: State) => {
    return state.selectedUser ? state.selectedUser.placeline : []
};

export const getUserDate = (state: State) => state.selectedUser;

export const getSelectedPartialSegment = (state: State) => state.selectedPartialSegment;

export const getSelectedPartialSegmentId = (state: State) => state.selectedPartialSegment;

export const getTimelineQuery = (state: State) => state.timelineQuery;

export const getSegmentsArray = (state: State) => {
  if (state.selectedUser) {
      return state.selectedUser.placeline
  }
  return [];
};

export const getSelectedSegmentsId = (state: State) => state.selectedSegmentId;

export const getSelectedEventId = (state: State) => state.selectedEventId;

export const getSelectedActionId = (state: State) => state.selectedActionId;

export const getCurrentUserData = createSelector(getUserDate, getSelectedPartialSegment, (userData, partialUserData) => {
    if (partialUserData && userData) {
    let selectedSegment = userData.placeline.find(segment => {
      return segment.id == partialUserData;
    });
    return {...userData, actions: [], segments: [selectedSegment]}
  } else {
    return userData
  }
})

export const getSelectedSegment = createSelector(getSegments, getSelectedSegmentsId, getSelectedActionId, (segments, id, selectedActionId) => {
    if (selectedActionId) return false;
    return _.find(segments, (segment: IPlaceline) => {
        return id ? id == segment.id : false
    });
});

export const getMapArray = (state: State) => _.values(state.usersMapEntity);

export const getUserMap = (state: State) => state.usersMapEntity;

export const getUserMapFilter = (state: State) => state.filterMap;

// export const getFilteredMapArray = (state: State) => _.filter(state.usersMapEntity, state.filterMap);
export const getFilteredMapArray = createSelector(getUserMap, getUserMapFilter, (userMapEntity, userMapFilter) => {
  var a =  _.filter(userMapEntity, (user) => {
    return userMapFilter(user)
  });
  return {validUsers: a, invalidUsers: []}
  // return _.reduce(userMapEntity, (acc, user) => {
  //   if(userMapFilter(user)) {
  //     acc.validUsers.push(user)
  //     return acc
  //   } else {
  //     return acc
  //   }
  // }, {validUsers: [], invalidUsers: []});
    // return _.filter(userMapEntity, userMapFilter)
});
//
// export const getInvalidMarker = createSelector(getFilteredMapArray, (usersMap) => {
//   let users = _.reject(usersMap, htUser().isValidMarker);
//   console.log(users, "invalid");
//   return users ? users.length : 0
// });

export const getSummary = (state: State) => state.summary;

export const getPageData = (state: State) => state.pageData;

export const getPlace = (state: State) => state.userPlaceEntity;

export const getPlaceFilter = (state: State) => state.filterPlace;

export const getSelectedUserPlace = (state: State) => state.selectedUserPlaceEntity;

// export const getFilteredPlaceArray = (state: State) => _.filter(state.userPlaceEntity, state.filterPlace);
export const getFilteredPlaceArray = createSelector(getPlace, getSelectedUserPlace, getPlaceFilter, (placesEntity, selectedUserPlacesEntity, placeFilter) => {
    let selectedUserPlaceArray = _.values(selectedUserPlacesEntity);
    if(selectedUserPlaceArray.length) {
        return _.filter(selectedUserPlaceArray, placeFilter)
    } else {
       return _.filter(placesEntity, placeFilter)
    }
});

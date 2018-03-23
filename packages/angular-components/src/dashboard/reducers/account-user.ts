import * as fromAccountUser from '../actions/account-user';
import {IAccountUser, IMembership} from "ht-models";
import {config} from "../config";
import {GetAccountFromMemberships, GetMemberFromMemberships, isCurrentAccount} from "../../utils/account-user-helper";
import {createSelector} from "reselect";
import * as _ from "underscore";

const initialState: State = {
  accountUser: null,
  memberships: null,
  type: 'production',
  loading: {
    data: true
  }
};

export interface State {
  accountUser: IAccountUser | null,
  memberships: IMembership[] | null,
  type: "test" | "production",
  loading: {
    data: boolean,
    item?: string
  }
}

export function accountUserReducer(state: State = initialState, action : fromAccountUser.Actions): State {
  switch (action.type) {
    case fromAccountUser.UPDATE_ACCOUNT_USER: {
      return {...state, loading: {...state.loading, data: true, item: action.payload.item}}
    }
    case fromAccountUser.SET_ACCOUNT_USER: {
      return {...state, accountUser: action.payload, loading: {data: false}}
    }
    case fromAccountUser.UPDATE_MEMBERSHIPS: {
      return {...state, memberships: action.payload}
    }
    case fromAccountUser.PATCH_DEFAULT_ACCOUNT: {
      let accountUser: IAccountUser = {...state.accountUser, default_account: action.payload};
      return {...state, accountUser}
    }
    case fromAccountUser.PATCH_MEMBERSHIPS: {
      let account = action.payload;
      let memberships = _.map(state.memberships, (membership) => {
        if(membership.account.id == account.id) {
          return {...membership, account}
        } else {
          return membership
        }
      });
      return {...state, memberships}
    }
    default: {
      return state
    }
  }
}

export const getAccountUser = (state: State) => state.accountUser;
export const getMemberships = (state: State) => state.memberships;
export const getCurrentAccount = createSelector(getAccountUser, getMemberships, (accountUser: IAccountUser, memberships: IMembership[]) => {
  if(accountUser && isCurrentAccount(accountUser.default_account, config.token, config.tokenType)) {
    config.isDefaultAccount = true;
    return accountUser.default_account
  } else if(memberships) {
    config.isDefaultAccount = false;
    let membership = GetMemberFromMemberships(memberships, config.token, config.tokenType);
    return membership ? membership.account : null
  } else {
    return null
  }
});
export const getMember = (state: State) => GetMemberFromMemberships(state.memberships, config.token, config.tokenType);
// export const getAccount = (state: State) => GetAccountFromMemberships(state.memberships, config.token, config.tokenType);
export const getAccountType = (state: State) => state.type;
export const getLoading = (state: State) => state.loading;

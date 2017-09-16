import {Action, ActionReducerFactory, ActionReducerMap, InitialState, MetaReducer} from "./models";
import {combineReducers, createReducerFactory} from "./utils";
import {Dispatcher} from "./dispatcher";
import {ReducerManager} from "./reducer-manager";
import {ScannedActionsSubject} from "./scanned-action";
import {State} from "./state";
import {Store} from "./store";

export type StoreConfig<T, V extends Action = Action> = {
  initialState?: InitialState<T>;
  reducerFactory?: ActionReducerFactory<T, V>;
  metaReducers?: MetaReducer<T, V>[];
};

export class StoreProvider {
  INITIAL_STATE;
  metaReducers;
  _REDUCER_FACTORY;
  REDUCER_FACTORY;
  dispatcher;
  reducerManager;
  SCANNED_ACTIONS_SUBJECT_PROVIDERS;
  STATE_PROVIDERS;
  STORE_PROVIDERS;

  constructor(reducers: | ActionReducerMap<any, any>, config: StoreConfig<any, any> = {}) {
    this.INITIAL_STATE = config.initialState;
    this.metaReducers = config.metaReducers;
    this._REDUCER_FACTORY = config.reducerFactory ? config.reducerFactory : combineReducers;
    this.REDUCER_FACTORY = createReducerFactory(this._REDUCER_FACTORY, this.metaReducers);
    this.dispatcher = new Dispatcher(); //actionSubject
    this.reducerManager = new ReducerManager(this.dispatcher, this.INITIAL_STATE, reducers, this.REDUCER_FACTORY);
    this.SCANNED_ACTIONS_SUBJECT_PROVIDERS = new ScannedActionsSubject();
    this.STATE_PROVIDERS = new State(this.dispatcher, this.reducerManager, this.SCANNED_ACTIONS_SUBJECT_PROVIDERS, this.INITIAL_STATE);
    this.STORE_PROVIDERS = new Store(this.STATE_PROVIDERS, this.dispatcher, this.reducerManager)
  }
}


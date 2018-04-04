import {Action} from "@ngrx/store";
import * as fromReplay from "../reducers/replay";

export const START_REPLAY = '[REPLAY] Start Task';
export const UPDATE_REPLAY = '[REPLAY] Update';
export const SET_CURRENT_HEAD = '[REPLAY] Set Current';
export const JUMP_TO_TIME = '[REPLAY] Jump To Time';
export const UPDATE_SPEED = '[REPLAY] Update Speed';
export const CLEAR_REPLAY = '[REPLAY] Clear';
export const STOP_REPLAY = '[REPLAY] Stop';
export const START_TICK = '[REPLAY] Start Tick Replay';
export const NEXT_TICK = '[REPLAY] Next Tick Replay';
export const PAUSE_TICK = '[REPLAY] Pause Tick Replay';

export class StartReplayAction implements Action {
    readonly type = START_REPLAY;
    constructor(public payload: fromReplay.IReplayStats) {}
}

export class UpdateReplayAction implements Action {
    readonly type = UPDATE_REPLAY;
    constructor(public payload: fromReplay.IReplayStats) {}
}

export class SetCurrentHeadAction implements Action {
    readonly type = SET_CURRENT_HEAD;
    constructor(public payload: fromReplay.IReplayHead) {}
}

export class JumpToTimeAction implements Action {
    readonly type =  JUMP_TO_TIME;
    constructor(public payload: number) {}
}

export class UpdateSpeedAction implements Action {
    readonly type = UPDATE_SPEED;
    constructor(public payload: number) {}
}

export class ClearReplayAction implements Action {
    readonly type = CLEAR_REPLAY;

}

export class StopReplayAction implements Action {
    readonly type = STOP_REPLAY;

}

export class StartTickAction implements Action {
    readonly type = START_TICK
}


export class NextTickAction implements Action {
    readonly type = NEXT_TICK
}

export class PauseTickAction implements Action {
    readonly type = PAUSE_TICK
}

export type Actions
    = StartReplayAction
    | UpdateReplayAction
    | SetCurrentHeadAction
    | JumpToTimeAction
    | UpdateSpeedAction
    | ClearReplayAction
    | StopReplayAction
    | StartTickAction
    | NextTickAction
    | PauseTickAction

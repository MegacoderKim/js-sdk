import * as fromReplay from "../actions/replay"
import {state} from "@angular/core";
import {ITimeAwarePoint} from "../model/common";
import {stat} from "fs";

export const initialState: State = {
    stats: null,
    head: null,
    isPlaying: false,
    animationSpeed: 1 // 60 min trip in 30 sec
};

export interface State {
    id?: string,
    isPlaying: boolean,
    stats: IReplayStats | null,
    head: IReplayHead | null,
    animationSpeed: number,
}

export interface IReplayHead {
    timePercent: number,
    currentTime: string,
    currentPosition: number[],
    bearing: number
}

export interface IReplayStats {
    start: string,
    end: string,
    duration: number,
    distance: number,
    timeAwarePolylineArray?: ITimeAwarePoint[],
}

export function replayReducer(state: State = initialState, action : fromReplay.Actions): State {
    switch (action.type) {
        case fromReplay.START_REPLAY: {
            return {...initialState, stats: action.payload}
        }
        case fromReplay.UPDATE_REPLAY: {
            return {...state, stats: action.payload}
        }
        case fromReplay.SET_CURRENT_HEAD: {
            return {...state, head: action.payload}
        }
        case fromReplay.UPDATE_SPEED: {
            return {...state, animationSpeed: action.payload}
        }
        case fromReplay.CLEAR_REPLAY: {
            return {...initialState}
        }
        case fromReplay.STOP_REPLAY: {
            return {...state, head: null}
        }
        case fromReplay.START_TICK: {
            return {...state, isPlaying: true}
        }
        case fromReplay.JUMP_TO_TIME: {
            return {...state, isPlaying: false}
        }
        case fromReplay.PAUSE_TICK: {
            return {...state, isPlaying: false}
        }
        default: {
            return state
        }
    }

}

export const getStats = (state: State) => state.stats;

export const getHead = (state: State) => state.head;

export const getSpeed = (state: State) => state.animationSpeed;

export const getIsPlaying = (state: State) => state.isPlaying;
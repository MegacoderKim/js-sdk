import {IAction, IPlaceline, IUserPlaceline} from "ht-models";
import {scaleOrdinal, schemeCategory10, schemeCategory20, schemeCategory20c} from "d3-scale";
import { schemeSet1 } from 'd3-scale-chromatic'
import * as _ from "underscore";


const color = scaleOrdinal(schemeCategory10);
function FillTripColor(segments: IPlaceline[], actions: IAction[]) {
    let completedActions = _.filter(actions, (action: IAction) => {
        return !!action.completed_at;
    });
    if(completedActions.length) {
        return _.reduce(segments, (acc, segment: IPlaceline) => {
            if(toBreakSegment(segment, acc.currentActionIndex)){
                let nextActionIndex = acc.currentActionIndex + 1;
                return {
                    segments: [...acc.segments, {...segment, displayColor: color('' + nextActionIndex)}],
                    currentActionIndex: nextActionIndex
                }
            } else {
                return {
                    ...acc,
                    segments: [...acc.segments, {...segment, displayColor: color('' + acc.currentActionIndex)}]
                }
            }
        }, {
            segments: [],
            currentActionIndex: 0
        }).segments
    } else {
        return segments
    }

    function toBreakSegment(segment: IPlaceline, currentActionIndex) {
        return (segment.type == 'trip' && completedActions[currentActionIndex] && segmentAfterAction(segment, completedActions[currentActionIndex]))
    }

    function segmentAfterAction(segment: IPlaceline, action: IAction) {
        return segment.started_at && segment.started_at > action.completed_at;
    }

}

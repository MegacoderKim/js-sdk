import {Color} from "../../utils/color";
import * as _ from 'underscore';
import {MapItems} from "./map-items";
import {IAction} from "ht-models";
import {HtActionPolyline} from "./action-polyline";
import {htAction} from "ht-data";

export class HtActionsPolylines extends MapItems{
    itemEntities: {[id: string]: HtActionPolyline} = {};
    isFaded: boolean = false;
    defaultStyle = {
        dashArray: '5, 7',
        color: Color.mapBg,
        opacity: 1,
        weight: 3,
        delay: 1200,
        pulseColor: Color.grey3
    };

    traceActions(currentPosition, items: IAction[], map: L.Map, setMap: boolean = false) {
        let sortedAction = _.sortBy(items, action => {
            let finalEta = action.eta || action.expected_at;
            return finalEta
        });
        let polylinesWithId = sortedAction.reduce((acc, action: IAction) => {
            let finalEta = action.eta || action.expected_at;
            // console.log("fina", finalEta, action.completed_at, (finalEta && !action.completed_at));
            if(finalEta && !action.completed_at) {
                let actionPostiion = this.getExpectedPostion(action);
                // console.log(acc, actionPostiion);
                if(acc.length == 0) {
                    return actionPostiion ? [...acc, {
                            path: [currentPosition, [actionPostiion.lat, actionPostiion.lng]],
                            id: action.id
                        }]: acc
                } else {
                    let pastPoint = _.last(acc)['path'][1];
                    return actionPostiion ? [...acc, {
                        path: [pastPoint, [actionPostiion.lat, actionPostiion.lng]],
                        id: action.id
                    }] : acc

                }
            } else {
                return acc
            }
        }, []);
      // this.trace(polylinesWithId, map, setMap)
    }

    traceItemEffect(item) {
      // console.log(item, "effect");
    }

    private getExpectedPostion(action: IAction) {
        return htAction(action).getExpectedPosition()
    }

    setFade(selectedItem, toFade: boolean = true) {
        _.each(this.itemEntities, (item: HtActionPolyline) => {
            if(toFade) {
                if(selectedItem && item.id == selectedItem.id){
                    item.item.bringToFront()
                } else {
                    // item.fadePolyline.addTo(this.map)
                    // item.item.remove()
                }
            } else {
                item.item.addTo(this.map);
                // item.item.setLatLngs(item.item.getLatLngs());
                // item.item.setS
                // item.fadePolyline.remove()
            }
            // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
        })
    }

    getItem(item) {
        let polyline = new HtActionPolyline({defaultStyle: this.defaultStyle});
        polyline.setStyle(this.defaultStyle);
        return polyline;
    }

}

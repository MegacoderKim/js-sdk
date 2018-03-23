import {IAction, IActionMap} from "ht-models";
import {ActionExpectedIcon, ActionIcon} from "../asserts/task-map";
import {HtActionMarker} from "./ht-action-marker";
import {htAction} from "ht-data";
import {DateString, HMString, HtShow, NameCase, TimeString, Color} from "ht-utility";
import {divIcon, latLngBounds, marker, polyline} from "leaflet";

export class ActionMarker extends HtActionMarker {
  item: L.Marker = marker([0,0], {
    zIndexOffset: 110
  });
  expectedItem: L.Marker = marker([0,0], {
    zIndexOffset: 110
  });
  expectedLine: L.Polyline = polyline([], {
    opacity: 0.1,
    fillOpacity: 0.1,
    weight: 5,
    color: Color.red,
    dashArray: '2, 2'
  });

  tooltipOption = {
    className: 'ht-popup',
    offset: [0, -5],
    opacity: 1
  };
  action = htAction();
  // test  = L.marker([0,0]);

  update(data: IAction, map: L.Map) {
    let actionPositions = htAction(data).getPositionsObject();
    let position = actionPositions.position;
    let leafletPos = this.mapUtils.getLatlng(position.lat, position.lng);
    this.mapUtils.updatePosition(this.item, leafletPos, this.getInfoContent(data), this.tooltipOption);
    let content = this.getActionDivContent(data, this.isFaded);
    this.setIcon(this.item, content);
    this.hasExpected = this.showExpected && !!actionPositions.isAwayFromExpected;
    if(this.hasExpected && !!actionPositions.position) {
      let leafletExpPos = this.mapUtils.getLatlng(actionPositions.expectedPosition.lat, actionPositions.expectedPosition.lng);
      this.mapUtils.updatePosition(this.expectedItem, leafletExpPos, "Expected location", this.tooltipOption);
      let content = this.getExpectedActionDivContent(data, false);
      this.setIcon(this.expectedItem, content);
      this.expectedLine.setLatLngs([[actionPositions.position.lat, actionPositions.position.lng], [actionPositions.expectedPosition.lat, actionPositions.expectedPosition.lng]]);
      this.addListeners(map)
    }
  }

  getInfoContent(item: IActionMap | IAction) {
    let userName = item.user ? item.user.name : '';
    return `<div class="flex-column flex-center" style="min-width: 180px">
<div class=" text-1">
    <div class="text-center">${NameCase(item.type)}
    <span style="${HtShow(item.display.duration_remaining && !item.completed_at)}"> in ${HMString(item.display.duration_remaining/60)}</span>
    <span style="${HtShow(!!item.completed_at)}"> completed at ${TimeString(item.completed_at)}</span>
   
    </div>
</div>
    <div class="text-muted text-center" style="${HtShow(!!item.completed_at)}"> ${DateString(item.completed_at)}</div>
<div class="text-center">${NameCase(userName)}<span style="${HtShow(!!item.lookup_id, 'block')}"> | #${item.lookup_id}</span></div>
</div>`
  }

  updateItem(data) {
    this.action.data = data;
    super.updateItem(data)
  }

  setMap(map) {
    this.mapUtils.setMap(this.item, map);
    this.hasExpected = this.showExpected && !!this.action.isAwayFromExpected();
    if(this.hasExpected) {
      this.mapUtils.setMap(this.expectedItem, map);
      this.mapUtils.setMap(this.expectedLine, map)
    }
  }

  getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
    if(this.expectedItem.getElement()) bounds.extend(this.expectedItem.getLatLng());
    return bounds.extend(this.item.getLatLng());
  }

  // getPosition(item: IActionMap) {
  //   let position = GetActionPosition(item) || [0,0];
  //   return L.latLng(position)
  // }

  private setIcon(mapItem: L.Marker, content: string) {
    mapItem.setIcon(this.getIcon(content))
  }

  private getIcon(content: string) {
    return divIcon({
      html: content,
      className: 'current-action-marker',
      iconSize: [35, 35]
    })
  }

  private getDivContent(action: IActionMap) {
    let content = this.getActionDivContent(this.getActionIcon(action))
    return content
  }

  private getActionIcon(action: IAction | IActionMap) {
    return ActionIcon(action)
  }

  getActionDivContent(action: IAction | IActionMap, isFaded: boolean = false) {
    if(isFaded || !action) {
      return this.unselectedContent();
    } else {
      let img = ActionIcon(action);
      let icon = `<div id="action-marker flex-row">
<img style="height: 35px" src="${img}" class="auto" alt="">
</div>`;
      return icon
    }

  }

  unHighlight(map) {
    // this.isFaded = true;
    this.setIcon(this.item, this.unselectedContent());
    this.item.setZIndexOffset(-10)
  }

  highlight(map) {
    // this.openTooltip();
    // this.setFocus(map);
  }

  setFocus(map: L.Map) {
    let center = this.item.getLatLng();
    if(center) map.panTo(center, {animate: true, easeLinearity: 0.58, duration: 1})
  }

  resetItem() {
    this.setIcon(this.item, this.getActionDivContent(this.data));
    this.item.setZIndexOffset(110);
  }

  //expected
  // actionsPositions(action: IAction, map: L.Map): ActionPositions | false {
  //   if(action && action.completed_at && action.expected_place && action.expected_place.location && action.completed_place && action.completed_place.location) {
  //     let compLoc = action.completed_place.location.coordinates;
  //     let expLoc = action.expected_place.location.coordinates;
  //     let position = L.latLng(compLoc[1], compLoc[0]);
  //     let expectedPosition = L.latLng(expLoc[1], expLoc[0]);
  //     let distance = map.distance(position, expectedPosition);
  //     if(distance > 500) {
  //       return {position, expectedPosition}
  //     } else {
  //       return false
  //     }
  //   }else {
  //     return false
  //   }
  //
  // }

  clear() {
    this.expectedItem.remove();
    this.expectedItem.off();
    this.expectedLine.remove();
    this.item.off();
    super.clear();
  }

  getExpectedActionDivContent(action: IAction | IActionMap, isFaded: boolean = false) {
    if(isFaded || !action) {
      return this.unselectedContent();
    } else {
      let img = this.getActionExpectedIcon(action);
      let icon = `<div id="action-marker flex-row">
<img style="height: 35px" src="${img}" class="auto" alt="">
</div>`;
      return icon
    }
  }

  private getActionExpectedIcon(action: IAction | IActionMap) {
    return ActionExpectedIcon(action.type)
  }

  private addListeners(map) {
    this.expectedItem.on('mouseover', () => {
      this.item.openTooltip();
      // this.expectedLine.addTo(map)
    });

    this.expectedItem.on('mouseout', () => {
      this.item.closeTooltip();
      // this.expectedLine.remove()
    });

    this.item.on('mouseover', () => {
      this.expectedItem.openTooltip();
      // this.expectedLine.addTo(map)
    });

    this.item.on('mouseout', () => {
      this.expectedItem.closeTooltip();
      // this.expectedLine.remove()
    })
  }
}


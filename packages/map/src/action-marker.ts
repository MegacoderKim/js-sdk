import {HtMapItem} from "./map-item";
import {IActionMap} from "../../model/action";
import {NameCase} from "../../utils/src/name-case";
import {HtShow} from "../../utils/src/html-helpers";
import {HMString} from "../../utils/src/hm-string";
import {TimeString} from "../../utils/dist/src/time-string";
import {DateString} from "../../utils/src/date-string";
import {Color} from "../../utils/src/color";

export class HtActionMarker extends HtMapItem{

  getInfoContent(item: IActionMap) {
    let userName = item.user ? item.user.name : '';
    return `<div class="flex-column flex-center" style="min-width: 180px">
<div class=" text-1">
    <div class="text-center">${NameCase(item.type)}
    <span style="${HtShow(item.display.duration_remaining && !item.display.show_summary)}"> in ${HMString(item.display.duration_remaining/60)}</span>
    <span style="${HtShow(!!item.completed_at)}"> completed at ${TimeString(item.completed_at)}</span>
   
    </div>
</div>
    <div class="text-muted text-center" style="${HtShow(!!item.completed_at)}"> ${DateString(item.completed_at)}</div>
<div class="text-center">${NameCase(userName)}<span style="${HtShow(!!item.lookup_id, 'block')}"> | #${item.lookup_id}</span></div>
</div>`
  }

  unselectedContent() {
    let div = `<div style="border: 2px solid ${Color.grey5};border-radius: 50%;width: 17px; height: 17px; background: ${Color.grey3}; margin-top: 6px; margin-left: 6px"></div>`;
    return div
  }

}
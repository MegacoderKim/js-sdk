import * as moment from "moment-mini"

export function DateString(item: string, args?): string {
    if(typeof item == 'string' && item.length > 4 && moment(item).isValid()) {
        let format = args == 'short' ? 'MMM D' : 'MMM D, YYYY';
        return moment(item).format(format)
    } else {
        return item;
    }

}
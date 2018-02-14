import {HtRequest} from "../core/request";

export const htRequestService = (() => {
    var instance: HtRequest;

    return {
        getInstance(token?) {
            if (!instance) {
                instance = new HtRequest(token);
            }
            return instance;
        },
        setInstance(newintance: HtRequest) {
            instance = newintance;
        }
    };
})();
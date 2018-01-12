import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HtGroupsService } from "../ht/ht-groups.service";
export declare class GroupKeyResolver implements Resolve<any> {
    private groupService;
    constructor(groupService: HtGroupsService);
    resolve(next: ActivatedRouteSnapshot): Observable<any>;
}

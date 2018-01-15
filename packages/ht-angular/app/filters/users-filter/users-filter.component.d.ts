import { ChangeDetectorRef, OnInit } from '@angular/core';
import { HtUsersService } from "../../ht/ht-users.service";
import { Observable } from "rxjs/Observable";
export declare class UsersFilterComponent implements OnInit {
    private usersClientService;
    private cd;
    query$: Observable<any>;
    loading$: Observable<boolean>;
    statusFiltes: any;
    sortingLabels: any;
    ordering$: any;
    showFilter$: any;
    constructor(usersClientService: HtUsersService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    onQuery(query: any): void;
    clearQuery(key: any): void;
    setStatus(key: any, event: any): void;
    setOrdering(key: any): void;
}
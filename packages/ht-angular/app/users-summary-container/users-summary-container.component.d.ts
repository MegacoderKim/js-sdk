import { OnDestroy, OnInit } from '@angular/core';
import { HtUsersService } from "../ht/ht-users.service";
import { QueryLabel } from "ht-client";
export declare class UsersSummaryContainerComponent implements OnInit, OnDestroy {
    private usersClientService;
    summary$: any;
    queryLabels: QueryLabel[];
    hideTotal: boolean;
    selectable: boolean;
    constructor(usersClientService: HtUsersService);
    ngOnInit(): void;
    onClearQueryKey(key: any): void;
    setQuery(query: object): void;
    ngOnDestroy(): void;
}

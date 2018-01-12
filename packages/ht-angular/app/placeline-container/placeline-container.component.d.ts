import { OnDestroy, OnInit } from '@angular/core';
import { HtUsersService } from "../ht/ht-users.service";
export declare class PlacelineContainerComponent implements OnInit, OnDestroy {
    private userClientService;
    userId: string | null;
    showUserCard: boolean;
    userData$: any;
    constructor(userClientService: HtUsersService);
    ngOnInit(): void;
    onSegmentId(segmentId: string): void;
    onSelectSegmentId(segmentId: string): void;
    ngOnDestroy(): void;
}

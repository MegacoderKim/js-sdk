import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { IUser, IUserAnalytics, IUserData } from "ht-models";
export declare class UserCardComponent implements OnInit, OnChanges {
    user: IUserData | IUserAnalytics | IUser;
    selectedUserId: string | null;
    action: 'default' | 'close' | 'loading' | 'detail';
    onAction: EventEmitter<{}>;
    showStatus: boolean;
    hovered: boolean;
    hoverIn(): void;
    hoverOut(): void;
    constructor();
    ngOnInit(): void;
    getShowStatus(user: IUserData): boolean;
    fireAction(): void;
    ngOnChanges(a: any): void;
    getActionText(): "loading" | "Close" | "" | "View on Map";
    debug(e: any): void;
}
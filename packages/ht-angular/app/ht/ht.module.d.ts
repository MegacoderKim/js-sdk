import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { HtMapService } from "./ht-map.service";
import { HtClient, HtUsersClient, HtGroupsClient, AccountsClient } from "ht-client";
export declare var TOKEN: InjectionToken<{}>;
export declare function clientServiceFactory(token: any, http: any): HtClient;
export declare function mapServiceFactory(mapType: any): HtMapService;
export declare function userClientServiceFactory(): HtUsersClient;
export declare function groupClientServiceFactory(): HtGroupsClient;
export declare function accountUsersClientServiceFactory(): AccountsClient;
export declare class HtModule {
    static forRoot(config: any): ModuleWithProviders;
}
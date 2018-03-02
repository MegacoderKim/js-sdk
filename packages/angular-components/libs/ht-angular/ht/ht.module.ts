import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {HtMapService, MAP_TYPE} from "./ht-map.service";
import { usersClientFactory, groupsClientFactory, htClientService, actionsClientFactory} from "ht-client";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HtRequestService} from "./ht-request.service";
import {HtUsersService} from "./ht-users.service";
import {HtGroupsService} from "./ht-groups.service";
import {HtClientService} from "./ht-client.service";
import {HtClient, HtUsersClient, HtGroupsClient, AccountsClient, HtActionsClient} from "ht-client";
import {HtAccountService} from "./ht-account-users.service";
import {HtActionsService} from "./ht-actions.service";
import {mapTypeService} from "ht-maps";
import {htRequestService} from "ht-api";

export var TOKEN = new InjectionToken('app.token');

export function requestServiceFactory(http, token) {
  const request = new HtRequestService(http, token);
  return request
}

export function clientServiceFactory(token, request) {
  const client = htClientService.getInstance(token, request);
  return client
}

export function mapServiceFactory(mapType) {
  if (mapType === void 0) { mapType = 'google'; }
  return new HtMapService(mapType);
}

export function userClientServiceFactory() {
  return usersClientFactory()
}

export function actionClientServiceFactory() {
  return actionsClientFactory()
}

export function groupClientServiceFactory() {
  return groupsClientFactory()
}

export function accountUsersClientServiceFactory() {
  return new AccountsClient();
}

@NgModule({
  imports: [HttpClientModule]
})
export class HtModule {
  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: HtModule,
      providers: [
        HttpClient,
        { provide: MAP_TYPE, useValue: config.mapType },
        { provide: HtMapService, useFactory: mapServiceFactory, deps: [MAP_TYPE] },
        { provide: TOKEN, useValue: config.token },
        { provide: HtRequestService, useFactory: requestServiceFactory, deps: [HttpClient, TOKEN]},
        { provide: HtClientService,
          useFactory: clientServiceFactory,
          deps: [TOKEN, HtRequestService]
        },
        {
          provide: HtUsersService,
          useFactory: userClientServiceFactory
        },
        {
          provide: HtActionsService,
          useFactory: actionClientServiceFactory
        },
        {
          provide: HtGroupsService,
          useFactory: groupClientServiceFactory
        },
        {
          provide: HtAccountService,
          useFactory: accountUsersClientServiceFactory
          // useClass: AccountsClient
        },

      ]
    };

  };
}


import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {HtMapService} from "./ht-map.service";
import {HtClientConfig, HtRequest, HtClient} from "ht-client";
import {HtClientService} from "./ht-client.service";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HtRequestService} from "./ht-request.service";
import {HtUsersService} from "./ht-users.service";

export * from "./ht-client.service";
export * from "./ht-request.service";
export * from "./ht-map.service";

var TOKEN = new InjectionToken('app.token');
var MAP_TYPE = new InjectionToken('app.mapType');
/**
 * @param {?} request
 * @return {?}
 */
export function clientServiceFactory(request) {
  return new HtClientService(request);
}

/**
 * @param {?} http
 * @param {?} token
 * @return {?}
 */
export function requestServiceFactory(http, token) {
  HtClientConfig.setToken(token);
  var req = new HtRequestService(http);
  // req.http = http;
  return req;
}
/**
 * @param {?=} mapType
 * @return {?}
 */
export function mapServiceFactory(mapType) {
  if (mapType === void 0) { mapType = 'google'; }
  return new HtMapService(mapType);
}
/**
 * @param {?} clientService
 * @return {?}
 */
export function userClientServiceFactory(clientService) {
  return clientService.users;
}
/**
 * @param {?} clientService
 * @return {?}
 */
function actionsClientServiceFactory(clientService) {
  return clientService.actions;
}

export function forModuleRoot (config): ModuleWithProviders {
  return {
    ngModule: HtModule,
    providers: [
      HttpClient,
      { provide: 'MAP_TYPE', useValue: config.mapType },
      { provide: HtMapService, useFactory: mapServiceFactory, deps: ['MAP_TYPE'] },
      { provide: 'TOKEN', useValue: config.token },
      { provide: HtRequestService,
        useFactory: requestServiceFactory,
        deps: [HttpClient, 'TOKEN']
      },
      { provide: HtClientService,
        useFactory: clientServiceFactory,
        deps: [HtRequestService]
      },
      {
        provide: HtUsersService,
        useFactory: userClientServiceFactory,
        deps: [HtClientService]
      },

    ]
  };

};

@NgModule({
  imports: [HttpClientModule]
})
export class HtModule {
  static forRoot = forModuleRoot
}



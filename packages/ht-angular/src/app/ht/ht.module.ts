import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {HtMapService, MAP_TYPE} from "./ht-map.service";
import {HtRequest, HtClient, clientApi, IClientApi, htClientConfig} from "ht-client";
import {HtClientService} from "./ht-client.service";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HtRequestService} from "./ht-request.service";
import {HtUsersService} from "./ht-users.service";
import {HtConfigService} from "./ht-config.service";

export * from "./ht-client.service";
export * from "./ht-request.service";
export * from "./ht-map.service";

export var TOKEN = new InjectionToken('app.token');
// export var CLIENT_API = new InjectionToken<IClientApi>('client.api');

export function clientServiceFactory(request, token) {
  clientApi.setRequest(request);
  return new HtClientService(token);
}

export function requestServiceFactory(http) {
  return new HtRequestService(http);
}

export function mapServiceFactory(mapType) {
  if (mapType === void 0) { mapType = 'google'; }
  return new HtMapService(mapType);
}

export function userClientServiceFactory(clientService) {
  return clientService.users;
}

export function clientConfigFactory() {
  return {};
}

function actionsClientServiceFactory(clientService) {
  return clientService.actions;
}

export function forModuleRoot (config): ModuleWithProviders {
  return {
    ngModule: HtModule,
    providers: [
      HttpClient,
      { provide: MAP_TYPE, useValue: config.mapType },
      { provide: HtConfigService, useFactory: clientConfigFactory },
      { provide: HtMapService, useFactory: mapServiceFactory, deps: [MAP_TYPE] },
      // { provide: CLIENT_API, useValue: clientApi },
      { provide: TOKEN, useValue: config.token },
      { provide: HtRequestService,
        useFactory: requestServiceFactory,
        deps: [HttpClient]
      },
      { provide: HtClientService,
        useFactory: clientServiceFactory,
        deps: [HtRequestService, TOKEN]
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



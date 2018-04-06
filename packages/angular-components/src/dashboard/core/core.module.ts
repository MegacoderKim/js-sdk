import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {metaReducers, reducers} from "../reducers/index";
import {StoreModule} from "@ngrx/store";
import {AsyncLocalStorageModule} from "angular-async-local-storage";
import {BroadcastService} from "./broadcast.service";
import {AuthGuardService} from "../guards/auth-guard.service";
import {StorageService} from "./local-storage.service";
import {EffectsModule} from "@ngrx/effects";
import {AccountUserEffectsService} from "../effects/account-user.service";
import {UserService} from "../users/user.service";
import {InnerMapService} from "../map-container/map.service";
import {AccountUsersService} from "../account/account-users.service";
import {UserTraceService} from "../users/user-trace.service";
import {PageService} from "./page.service";
import {UserEffectsService} from "../effects/user-effects.service";
import {ActionService} from "../action/action.service";
import {ActionEffectsService} from "../effects/action-effects.service";
import {ActionTraceService} from "../action/action-trace.service";
import {EventService} from "../events/event.service";
import {ReplayEffectsService} from "../effects/replay-effects.service";
import {UiEffectsService} from "../effects/ui-effects.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {ContainerService} from "../container/container.service";
import {SocketsService} from "../sockets.service";
import {FitToMapService} from "../container/user-filter/fit-to-map.service";
import {SignupService} from "../signup/signup.service";
import {OnboardingService} from "../onboarding/onboarding.service";
import {AgreementService} from "../agreement/agreement.service";
import {LoadingEffectsService} from "../effects/loading-effects.service";
import { ContainerGuardGuard } from '../guards/container-guard.guard';
import {ExternalAnalyticsService} from "./external-analytics.service";
import {QuickstartService} from "./quickstart.service";
import { MembershipsService } from '../account/memberships.service';
import {LoggerService} from "./logger.service";
import {ModalService} from "./modal.service";
import {config} from "../config";
import {HtModule} from "ht-angular";
import { environment } from "../../environments/environment";

@NgModule({
  imports: [
    CommonModule,
    AsyncLocalStorageModule,
    HtModule.forRoot({
      token: config.token,
      mapType: 'leaflet',
      baseUrl: environment.baseUrl
    }),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      AccountUserEffectsService,
      UserEffectsService,
      ActionEffectsService,
      ReplayEffectsService,
      UiEffectsService,
      LoadingEffectsService
    ]),
  ],
  providers: [
    BroadcastService,
    AuthGuardService,
    StorageService,
    UserService,
    ActionService,
    InnerMapService,
    AccountUsersService,
    UserTraceService,
    ActionTraceService,
    PageService,
    EventService,
    SnackbarService,
    ContainerService,
    SocketsService,
    SignupService,
    FitToMapService,
    OnboardingService,
    AgreementService,
    ExternalAnalyticsService,
    ContainerGuardGuard,
    QuickstartService,
    LoggerService,
    ModalService,
    MembershipsService
  ],
  declarations: []
})
export class CoreServiceModule { }

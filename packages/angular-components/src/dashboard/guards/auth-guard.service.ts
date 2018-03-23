import { Injectable } from '@angular/core';
import {CanLoad, CanActivate, Router} from "@angular/router";
import {AccountUsersService} from "../account/account-users.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate{

  constructor(private accountUserService: AccountUsersService, private router: Router) { }

  canLoad() {
    return this.isLoggedIn()
  }

  canActivate() {
    return this.isLoggedIn()
  }

  isLoggedIn(): boolean | Observable<boolean> {
    return this.accountUserService.isLoggedIn().do((isLoggedIn) => {
      let url = location.href;
      if(!isLoggedIn) this.router.navigate(['/login'], {queryParams: {next: url}, queryParamsHandling: 'merge'})
    })
  }
}

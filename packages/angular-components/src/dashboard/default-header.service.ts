import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { GetToken} from "../utils/get-token";
import {config} from "./config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = GetToken();
    const currentToken = req.headers.get('Authorization');
    const noAuth = req.headers.get('X-NoAuth');
    const noHeader = req.headers.get('X-NoHeader');
    // req.headers.delete('X-NoHeader');
    // req.headers.delete('x-noheader');
    // console.log(req.headers.get('X-NoHeader'));
    if (noHeader) return next.handle(req.clone({headers: req.headers.delete('X-NoHeader')}));
    const authReq = currentToken || !!noAuth ? req.clone() : req.clone({headers: req.headers.set('Authorization', `token ${token}`)});
    // Pass on the cloned request instead of the original request.
    authReq.headers.delete('x-noheader');
    authReq.headers.delete('X-NoAuth');
    if (config.isStaff) {
      const staffReq = noHeader ? authReq.clone() : authReq.clone({headers: authReq.headers.set('X-HYPERTRACK-IS-STAFF', "True")})
      return next.handle(staffReq);
    } else {
      return next.handle(authReq.clone());
    }
  }
}

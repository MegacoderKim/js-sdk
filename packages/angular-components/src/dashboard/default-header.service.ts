import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { GetToken} from "../utils/get-token";
import {config} from "./config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    // let token = GetToken();
    // const currentToken = req.headers.get('Authorization');
    // const noAuth = req.headers.get('X-NoAuth');
    // const noHeader = req.headers.get('X-Header');
    // if (noHeader) return next.handle(req);
    // const authReq = currentToken || !!noAuth ? req.clone() : req.clone({headers: req.headers.set('Authorization', `token ${token}`)});
    // // Pass on the cloned request instead of the original request.
    // if (config.isStaff) {
    //   const staffReq = authReq.clone({headers: authReq.headers.set('X-HYPERTRACK-IS-STAFF', "True")})
    //   return next.handle(staffReq);
    // } else {
    //   return next.handle(authReq);
    // }
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AgreementService {

  constructor(
    private http: HttpClient
  ) { }

  sendSAASAgreementAcceptance(accountId, data) {
    let url = `app/accounts/${accountId}/accept_agreement/`;
    return this.http.post(url, data, {observe: 'response'});
  }

}

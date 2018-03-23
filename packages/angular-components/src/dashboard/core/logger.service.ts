import { Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class LoggerService {

  constructor(
    private route: ActivatedRoute
  ) { }

  public log(...blah: any[]) {
    let queryParams = this.route.snapshot.queryParams;
    if (queryParams.debug) {
      console.log('LOG:', ...blah);
    }
  }

}

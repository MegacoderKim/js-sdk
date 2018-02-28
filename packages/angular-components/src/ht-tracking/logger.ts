import {environment} from '../environments/environment';

export const Logger = {
  log: (...blah: any[]) => {
    if (!environment.production) {
      console.log('LOG:', ...blah);
    }
  }
};

import {getParameterByName} from './helper.util';

export const Logger = {
  log: (...blah: any[]) => {
    if (getParameterByName('debug')) {
      console.log('LOG:', ...blah);
    }
  }
};
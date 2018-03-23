let URLParser = require('url-parse');
import {environment} from '../../environments/environment';

export const parseURL = (url) => {
  return new URLParser(url);
};

export const isHyperTrackDomainURL = (url) => {
  let parsedURL = new URLParser(url);
  let baseDomain = environment.production ? 'hypertrack.com' : 'localhost';
  return (parsedURL.hostname && parsedURL.hostname.indexOf(baseDomain) > 0);
};

export const secondsToHms = (seconds: number) => {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  let s = Math.floor(seconds % 3600 % 60);

  return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
};

export const secondsToMinutes = (seconds: number) => {
  let minutes = (seconds / 60);
  return minutes.toFixed();
};

export const metersToMiles = (meters: number) => {
  let miles = meters * 0.000621371192;
  return miles.toFixed(1);
};

export const metersToKm = (meters: number) => {
  let km = meters / 1000;
  return km.toFixed(1);
};

export const showDistanceInMiles = (countryCode: string) => {
  return countryCode === 'US';
};

/* Convert meter per second to miles per hour*/
export const mpsToMPH = (meterPerSecond: number) => {
  let milesPerHour = meterPerSecond * 2.23694;
  return milesPerHour.toFixed(1);
};

/* Convert meter per second to km per hour*/
export const mpsToKPH = (meterPerSecond: number) => {
  let kmPerHour = meterPerSecond * 3.6;
  return kmPerHour.toFixed(1);
};

export const isNull = (value: any): value is null => {
  return value === null;
};

export const isUndefined = (value: any): value is undefined => {
  return value === void 0;
};

export const isNullOrUndefined = (value: any) : value is (null | undefined) => {
  return (isNull(value) || isUndefined(value));
};

export const getMonthName = (monthNumber: number) => {
  let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return monthNames[monthNumber];
};

export const getParameterByName = (name: string, url: string = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const getCustomerName = () => {
  return getParameterByName('c', window.location.href);
};

export const extractFromActionMetadata = (metadata: any, name: string) => {
  let value = '';
  for (let i = 0; i < metadata.length; i++) {
   let field = metadata[i];
   if (field[0].toLowerCase() === name.toLowerCase()) {
     value = field[1];
     break;
   }
  }
  return value;
};
export const config: IConfig = {
  tokenType: 'production',
  toReset: true,
  toPulse: true,
  timezone: 'UTC',
  stripeLoaded: false,
  isMobile: false,
  isDefaultAccount: true
};

interface IConfig {
  token?: string,
  adminToken?: string,
  readOnlyToken?: string,
  tokenType: 'test' | 'production',
  userId?: string,
  isDemo?: boolean,
  isWidget?: boolean,
  isStaff?: boolean,
  isNew?: boolean,
  toReset: boolean,
  toPulse: boolean,
  timezone: string,
  screenshot?: boolean
  stripeLoaded: boolean,
  isReadOnly?: boolean,
  htReferrerURL?: string,
  htLandingURL?: string,
  isMobile: boolean,
  isDefaultAccount?: boolean,
  placelinev2?: boolean
}

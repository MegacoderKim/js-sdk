export const config: IConfig = {
  environment: 'development',
  isMobile : false
};

interface IConfig {
  environment?: string;
  htLandingURL?: string;
  htReferrerURL?: string;
  isMobile : boolean
}

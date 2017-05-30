export const checkUserAgent = {
  Windows: function(userAgent: string) {
    return /IEMobile/i.test(userAgent);
  },
  Android: function(userAgent: string) {
    return /Android/i.test(userAgent);
  },
  BlackBerry: function(userAgent: string) {
    return /BlackBerry/i.test(userAgent);
  },
  iOS: function(userAgent: string) {
    return /iPhone|iPad|iPod/i.test(userAgent);
  },
  any: function(userAgent: string) {
    return (this.Android(userAgent) || this.BlackBerry(userAgent) || this.iOS(userAgent) || this.Windows(userAgent));
  },
  Chrome: function(userAgent: string) {
    return /Chrome/i.test(userAgent);
  },
  Safari: function(userAgent: string) {
    return /Safari/i.test(userAgent);
  },
  Firefox: function(userAgent: string) {
    return /Firefox/i.test(userAgent);
  }
};
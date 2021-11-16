const PROD = {
  name: 'prod',
  baseUrl: 'http://middle.dev2.clane.com:8000/',
  qrURl: 'http://merchant.dev2.clane.com:9003/',
  keys: {
    deviceId: '@DEVICE_ID',
    authId: '@AUTH_ID',
    accessId: '@AUTH_ACCESS_ID',
    refreshId: '@AUTH_REFRESH_ID',
  },
  page: {
    limit: 50,
    current: 1,
  },
  demo: true,
  version: '1.0.0',
};

export default PROD;

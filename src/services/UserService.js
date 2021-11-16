import {Cache} from '../utils';
import {ENV} from '../utils';

export default {
  async getAuth() {
    return await Cache.get(ENV.keys.authId);
  },
  async setAuth(auth: any) {
    await Cache.set(ENV.keys.authId, auth);
  },
  async getDeviceId() {
    return await Cache.get(ENV.keys.deviceId);
  },
  async setDevice(data: any) {
    await Cache.set(ENV.keys.deviceId, data);
  },
  async getAuthAccessToken() {
    return await Cache.get(ENV.keys.accessId);
  },
  async setAuthAccessToken(token: string) {
    await Cache.set(ENV.keys.accessId, token);
  },
  async getAuthRefreshToken() {
    return await Cache.get(ENV.keys.refreshId);
  },
  async setAuthRefreshToken(token: string) {
    await Cache.set(ENV.keys.refreshId, token);
  },
  async setAuthenticateCredentials(data: {[key: string]: any}) {
    await this.setAuth(data.userDetails);
    await this.setAuthAccessToken(data.authToken);
  },
  async isLoggedIn() {
    return !!(await this.getAuth());
  },
  async refreshToken(onResponse: any) {
    return '';
  },
};

import ApiHandler from '../ApiHandler';
const base = 'core/auth/';
const core = 'core/';
const oauth = 'basic/auth/proof/';
export default {
  proofCode: (data: Object) => ApiHandler.post(`${oauth}code`, data, null),
  proofValidate: (data: Object) =>
    ApiHandler.post(`${oauth}validate`, data, null),
  login: (data: Object, refresh = 0) =>
    ApiHandler.post(`oauth/token?refresh=${refresh}`, data),
  register: (data: any) => ApiHandler.post(`${base}sign-up`, data),
  changePwd: (data: any) => ApiHandler.post(`${base}change-password`, data),
  sendOTP: (data: any) => ApiHandler.post(`${base}send-otp`, data),
  getBVN: (data: any) => ApiHandler.post(`${core}bvn`, data),
};

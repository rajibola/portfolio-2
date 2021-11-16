import ApiHandler from '../ApiHandler';
const base = 'core/shortcuts';
const userBase = 'core/users';
export default {
  getAppShortcuts: () => ApiHandler.get(`${base}`),
  getUserShortcuts: (userId: string) =>
    ApiHandler.get(`${userBase}/${userId}/shortcuts`),
  updateUserShortcuts: (userId: string, data: any) =>
    ApiHandler.put(`${userBase}/${userId}/shortcuts`, data),
};

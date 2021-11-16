import ApiHandler from '../ApiHandler';
const base = 'core/accounts';
export default {
  getAccountById: (id: string) => ApiHandler.get(`${base}/${id}`),
  getAccounts: (data: any) => ApiHandler.post(base, data),
  createAccount: (data: any) => ApiHandler.post(base, data),
  updateAccount: (data: any) => ApiHandler.put(`${base}/${data.id}`, data),
};

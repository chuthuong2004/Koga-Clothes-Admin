import axiosClient from '@/lib/axios';
import { ParamLogin, ParamRegister, ParamResetPassword } from './types';
import { StoreUser } from '@/types/entities';
import { StoreToken } from '@/types/commons';
const URL = 'admin';
const authService = {
  login: async (body: ParamLogin): Promise<StoreUser & StoreToken> =>
    axiosClient.post(`${URL}/login`, body),
  loginWithGoogle: async (tokenId: string) => axiosClient.post(`${URL}/login/google`, { tokenId }),
  register: async (body: ParamRegister) => axiosClient.post(`${URL}/register`, body),
  logout: async () => axiosClient.delete(`${URL}/logout`),
  resetPassword: async (params: ParamResetPassword): Promise<void> =>
    axiosClient.post(`${URL}/forgot-password`, params),
};
export default authService;

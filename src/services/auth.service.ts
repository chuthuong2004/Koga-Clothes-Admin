import axiosClient from '@/lib/axios';
import { ParamLogin, ParamRegister, ParamResetPassword, QueryOptions } from './types';
import { StoreAdmin, StoreUser } from '@/types/entities';
import { ResponsePaginate, StoreToken } from '@/types/commons';
const URL = 'admin';
const authService = {
  login: async (body: ParamLogin): Promise<StoreUser & StoreToken> =>
    axiosClient.post(`${URL}/login`, body),
  loginWithGoogle: async (tokenId: string) => axiosClient.post(`${URL}/login/google`, { tokenId }),
  register: async (body: ParamRegister) => axiosClient.post(`${URL}/register`, body),
  logout: async () => axiosClient.delete(`${URL}/logout`),
  resetPassword: async (params: ParamResetPassword): Promise<void> =>
    axiosClient.post(`${URL}/forgot-password`, params),
  getAllStaffs: async (params: QueryOptions): Promise<ResponsePaginate<StoreAdmin>> =>
    axiosClient.get(`${URL}/staff`, { params }),
};
export default authService;
  
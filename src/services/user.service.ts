import axiosClient from '@/lib/axios';
import { StoreUser } from '@/types/entities';
import { ParamChangePassword, ParamCreateAddress, ParamUpdateProfile } from './types';

const URL = 'users';
const userService = {
  getProfile: async (): Promise<StoreUser> => axiosClient.get(`${URL}/profile`),
  updateProfile: async (body: Partial<ParamUpdateProfile>): Promise<StoreUser> =>
    axiosClient.patch(`${URL}/profile`, body),
  changePassword: async (body: ParamChangePassword) =>
    axiosClient.patch(`${URL}/change-password`, body),

  addAddress: async (body: ParamCreateAddress): Promise<StoreUser> =>
    axiosClient.post(`${URL}/me/addresses`, body),
  updateAddress: async (addressId: string, body: Partial<ParamCreateAddress>): Promise<StoreUser> =>
    axiosClient.patch(`${URL}/me/addresses/${addressId}`, body),
};
export default userService;

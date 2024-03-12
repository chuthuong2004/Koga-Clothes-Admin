import axiosClient from '@/lib/axios';
import { StoreAdmin, StoreRole } from '@/types/entities';
import { ParamCreateRole } from './types';

const URL = 'roles';

export const roleService = {
  create: async (body: ParamCreateRole): Promise<StoreRole> => axiosClient.post(URL, body),
  update: async (id: string, body: ParamCreateRole): Promise<StoreRole> =>
    axiosClient.patch(`${URL}/${id}`, body),
  getAll: async (): Promise<StoreRole[]> => axiosClient.get(URL),
  getAllStaffByRole: async (roleId: string): Promise<StoreAdmin[]> =>
    axiosClient.get(`${URL}/${roleId}/staff`),
};

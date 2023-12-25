import { StoreRole } from '@/types/entities';
import { QueryOptions } from './types';
import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons/response.type';

const URL = 'roles';

export const roleService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreRole>> =>
    axiosClient.get(URL, { params }),
};

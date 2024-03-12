import { StoreAdmin } from '@/types/entities';
import { QueryOptions } from './types';
import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';

const URL = 'admin';
const staffService = {
  getAllStaff: async (params: QueryOptions): Promise<ResponsePaginate<StoreAdmin>> =>
    axiosClient.get(`${URL}/staff`, { params }),
};
export default staffService;

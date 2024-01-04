import axiosClient from '@/lib/axios';
import { ParamsCreateCategory, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreCategory } from '@/types/entities';

const URL = 'categories';
const categoryService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreCategory>> =>
    axiosClient.get(URL, { params }),
  getTree: async (params: QueryOptions): Promise<ResponsePaginate<StoreCategory>> =>
    axiosClient.get(`${URL}/tree`, { params }),
  getById: async (id: string): Promise<StoreCategory> => axiosClient.get(`${URL}/${id}`),
  create: async (body: ParamsCreateCategory): Promise<StoreCategory> =>
    axiosClient.post(`${URL}`, body),
  update: async (id: string, body: Partial<ParamsCreateCategory>): Promise<StoreCategory> =>
    axiosClient.patch(`${URL}/${id}`, body),
  delete: async (id: string): Promise<void> => axiosClient.delete(`${URL}/${id}`),
};
export default categoryService;

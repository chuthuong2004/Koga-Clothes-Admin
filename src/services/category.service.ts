import axiosClient from '@/lib/axios';
import { ParamsCreateCategory, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreCategory } from '@/types/entities';

const URL = 'categories';
const categoryService = {
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreCategory>> =>
    axiosClient.get(URL, { params }),
  getById: (id: string): Promise<StoreCategory> => axiosClient.get(`${URL}/${id}`),
  create: (body: ParamsCreateCategory): Promise<StoreCategory> => axiosClient.post(`${URL}`, body),
  update: (id: string, body: ParamsCreateCategory): Promise<StoreCategory> =>
    axiosClient.patch(`${URL}/${id}`, body),
};
export default categoryService;

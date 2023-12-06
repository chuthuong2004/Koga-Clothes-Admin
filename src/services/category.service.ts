import axiosClient from '@/lib/axios';
import { QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreCategory } from '@/types/entities';

const URL = 'categories';
const categoryService = {
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreCategory>> =>
    axiosClient.get(URL, { params }),
  getById: (id: string): Promise<StoreCategory> =>  axiosClient.get(`${URL}/${id}`),
};
export default categoryService;

import { StoreBrand } from '@/types/entities';
import { QueryOptions } from './types';
import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';

const URL = 'brands';
const brandService = {
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreBrand>> =>
    axiosClient.get(URL, { params }),
  getById: (id: string): Promise<StoreBrand> => {
    return axiosClient.get(`${URL}/${id}`);
  },
};
export default brandService;

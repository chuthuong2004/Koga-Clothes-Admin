import { StoreBrand } from '@/types/entities';
import { ParamCreateBrand, QueryOptions } from './types';
import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';

const URL = 'brands';
const brandService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreBrand>> =>
    axiosClient.get(URL, { params }),
  getById: async (id: string): Promise<StoreBrand> => {
    return axiosClient.get(`${URL}/${id}`);
  },
  create: async (body: ParamCreateBrand): Promise<StoreBrand> => axiosClient.post(URL, body),
  update: async (id: StoreBrand['_id'], body: Partial<ParamCreateBrand>): Promise<StoreBrand> =>
    axiosClient.patch(`${URL}/${id}`, body),
  delete: async (id: StoreBrand['_id']) => axiosClient.delete(`${URL}/${id}`),
};
export default brandService;

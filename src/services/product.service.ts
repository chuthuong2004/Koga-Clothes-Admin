import axiosClient from '@/lib/axios';
import { ParamCreateProduct, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreProduct } from '@/types/entities';

const URL = 'products';
const productService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreProduct>> =>
    axiosClient.get(URL, { params }),
  getById: async (id: StoreProduct['_id'] | string): Promise<StoreProduct> =>
    axiosClient.get(`${URL}/${id}`),
  create: async (body: ParamCreateProduct): Promise<StoreProduct> => axiosClient.post(URL, body),
  delete: async (id: StoreProduct['_id']): Promise<void> => axiosClient.delete(`${URL}/${id}`),
};
export default productService;

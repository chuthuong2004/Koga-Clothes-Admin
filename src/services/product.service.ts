import axiosClient from '@/lib/axios';
import { QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreProduct } from '@/types/entities';

const URL = 'products';
const productService = {
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreProduct>> =>
    axiosClient.get(URL, { params }),
  getById: (id: StoreProduct['_id'] | string): Promise<StoreProduct> => axiosClient.get(`${URL}/${id}`),
  favorite: (
    productId: string,
    action: 'add' | 'remove',
  ): Promise<ResponsePaginate<StoreProduct>> =>
    axiosClient.patch(`${URL}/favorite/${action}/${productId}`),
};
export default productService;

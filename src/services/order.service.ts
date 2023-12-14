import axiosClient from '@/lib/axios';
import { ParamCancelOrder, ParamCreateOrder, ParamUpdateOrder, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreOrder } from '@/types/entities';

const URL = 'orders';
const orderService = {
  getMyOrder: async (params: QueryOptions): Promise<ResponsePaginate<StoreOrder>> =>
    axiosClient.get(`${URL}/me`, { params }),
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreOrder>> =>
    axiosClient.get(`${URL}/admin`, { params }),
  create: async (body: ParamCreateOrder) => axiosClient.post(URL, body),
  getById: async (id: StoreOrder['_id']): Promise<StoreOrder> => axiosClient.get(`${URL}/${id}`),
  cancelOrder: async (id: StoreOrder['_id'], body: ParamCancelOrder) =>
    axiosClient.patch(`${URL}/${id}/cancel`, body),
  updateOrder: async (id: StoreOrder['_id'], body: ParamUpdateOrder) =>
    axiosClient.patch(`${URL}/${id}`, body),
};
export default orderService;

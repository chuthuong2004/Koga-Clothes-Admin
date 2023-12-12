import axiosClient from '@/lib/axios';
import { ParamCreateProduct, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import {  StoreRepository } from '@/types/entities';

const URL = 'stores';
const repositoryService = {
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreRepository>> =>
    axiosClient.get(URL, { params }),
  getById: (id: StoreRepository['_id'] | string): Promise<StoreRepository> =>
    axiosClient.get(`${URL}/${id}`),
  create: async (body: ParamCreateProduct): Promise<StoreRepository> => axiosClient.post(URL, body),
};
export default repositoryService;

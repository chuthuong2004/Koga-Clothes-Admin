import axiosClient from '@/lib/axios';
import { ParamCreateRepository, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreRepository } from '@/types/entities';

const URL = 'stores';
const repositoryService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreRepository>> =>
    axiosClient.get(URL, { params }),
  getById: async (id: StoreRepository['_id'] | string): Promise<StoreRepository> =>
    axiosClient.get(`${URL}/${id}`),
  create: async (body: ParamCreateRepository): Promise<StoreRepository> =>
    axiosClient.post(URL, body),
  update: async (
    id: StoreRepository['_id'],
    body: Partial<ParamCreateRepository>,
  ): Promise<StoreRepository> => axiosClient.patch(`${URL}/${id}`, body),
  delete: async (id: StoreRepository['_id']) => axiosClient.delete(`${URL}/${id}`),
};
export default repositoryService;

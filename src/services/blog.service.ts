import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';
import { StoreBlog } from '@/types/entities';
import { ParamCreateBlog, QueryOptions } from './types';

const URL = 'blogs';
const blogService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreBlog>> =>
    axiosClient.get(URL, { params }),
  getById: async (id: string): Promise<StoreBlog> => {
    return axiosClient.get(`${URL}/${id}`);
  },
  create: async (body: ParamCreateBlog): Promise<StoreBlog> => axiosClient.post(URL, body),
  update: async (id: StoreBlog['_id'], body: Partial<ParamCreateBlog>): Promise<StoreBlog> =>
    axiosClient.patch(`${URL}/${id}`, body),
  delete: async (id: StoreBlog['_id']) => axiosClient.delete(`${URL}/${id}`),
};
export default blogService;

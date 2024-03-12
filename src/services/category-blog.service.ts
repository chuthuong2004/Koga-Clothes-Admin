import axiosClient from '@/lib/axios';
import { ParamsCreateCategoryBlog, QueryOptions } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreCategoryBlog } from '@/types/entities';

const URL = 'categories-blog';
const categoryService = {
  getAll: async (params: QueryOptions): Promise<ResponsePaginate<StoreCategoryBlog>> =>
    axiosClient.get(URL, { params }),
  getTree: async (params: QueryOptions): Promise<ResponsePaginate<StoreCategoryBlog>> =>
    axiosClient.get(`${URL}/tree`, { params }),
  getById: async (id: string): Promise<StoreCategoryBlog> => axiosClient.get(`${URL}/${id}`),
  create: async (body: ParamsCreateCategoryBlog): Promise<StoreCategoryBlog> =>
    axiosClient.post(`${URL}`, body),
  update: async (id: string, body: Partial<ParamsCreateCategoryBlog>): Promise<StoreCategoryBlog> =>
    axiosClient.patch(`${URL}/${id}`, body),
  delete: async (id: string): Promise<void> => axiosClient.delete(`${URL}/${id}`),
};
export default categoryService;

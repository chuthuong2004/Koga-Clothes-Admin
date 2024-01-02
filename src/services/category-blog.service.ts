import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';
import { StoreCategoryBlog } from '@/types/entities';
import { ParamsCreateCategory, QueryOptions } from './types';

const URL = 'blogs/categories';
const categoryBlogService = {
  getAll: (params: QueryOptions): Promise<ResponsePaginate<StoreCategoryBlog>> =>
    axiosClient.get(URL, { params }),
  getById: (id: string): Promise<StoreCategoryBlog> => axiosClient.get(`${URL}/${id}`),
  create: (body: ParamsCreateCategory): Promise<StoreCategoryBlog> =>
    axiosClient.post(`${URL}`, body),
  update: (id: string, body: ParamsCreateCategory): Promise<StoreCategoryBlog> =>
    axiosClient.patch(`${URL}/${id}`, body),
};
export default categoryBlogService;

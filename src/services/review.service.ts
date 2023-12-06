import axiosClient from '@/lib/axios';
import { ParamCreateReview } from './types';
import { ResponsePaginate } from '@/types/commons';
import { StoreReview } from '@/types/entities';

const URL = 'reviews';
const reviewService = {
  create: (reviews: ParamCreateReview[]): Promise<StoreReview> => axiosClient.post(URL, { reviews }),
  getReviewsByProduct: (productId: string): Promise<ResponsePaginate<StoreReview>> => axiosClient.get(`${URL}/${productId}`)
};
export default reviewService;

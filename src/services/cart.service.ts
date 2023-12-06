import axiosClient from '@/lib/axios';
import { StoreCart } from '@/types/entities';
import { ParamAddToCart } from './types';

const URL = 'carts';
const cartService = {
  getMyCart: async (): Promise<StoreCart> => axiosClient.get(`${URL}/me`),
  addToCart: async (body: ParamAddToCart): Promise<StoreCart> =>
    axiosClient.post(`${URL}/add-to-cart`, body),
  removeItemCart: async (cartItemId: string) =>
    axiosClient.patch(`${URL}/remove-item/${cartItemId}`),
  updateQuantity: async (cartItemId: string, quantity: number) =>
    axiosClient.patch(`${URL}/${cartItemId}`, { quantity }),
};
export default cartService;

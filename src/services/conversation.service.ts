import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';
import { StoreConversation } from '@/types/entities';
import { ParamCreateConversation, QueryOptions } from './types';

const URL = 'conversations'
const conversationService = {
  create: (body: ParamCreateConversation): Promise<StoreConversation> =>      axiosClient.post(URL, body),
  getMyConversation: (params: QueryOptions): Promise<ResponsePaginate<StoreConversation>> => 
    axiosClient.get(URL, {params}),
  updateConversation: (conversationId: string): Promise<StoreConversation> => axiosClient.put(`${URL}/${conversationId}`)
};
export default conversationService;

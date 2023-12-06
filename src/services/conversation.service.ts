import axiosClient from '@/lib/axios';
import { ResponsePaginate } from '@/types/commons';
import { StoreConversation } from '@/types/entities';
import { ParamCreateConversation } from './types';

const URL = 'conversations'
const conversationService = {
  create: (body: ParamCreateConversation): Promise<StoreConversation> =>      axiosClient.post(URL, body),
  getMyConversation: (): Promise<ResponsePaginate<StoreConversation>> => 
    axiosClient.get(URL),
  updateConversation: (conversationId: string): Promise<StoreConversation> => axiosClient.put(`${URL}/${conversationId}`)
};
export default conversationService;

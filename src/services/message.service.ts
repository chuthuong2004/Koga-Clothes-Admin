import axiosClient from '@/lib/axios';
import { ParamCreateMessage, QueryOptions } from './types';
import { StoreMessage } from '@/types/entities';
import { ResponsePaginate } from '@/types/commons';

const URL = 'messages';
const messageService = {
  create: (body: ParamCreateMessage): Promise<StoreMessage> => axiosClient.post(URL, body),
  getMessagesFromConversation: (
    conversationId: string,
    params: QueryOptions,
  ): Promise<ResponsePaginate<StoreMessage>> =>
    axiosClient.get(`${URL}/${conversationId}`, { params }),
  updateSeenMessage: (conversationId: string, receiverId: string) =>
    axiosClient.put(`${URL}/${conversationId}/${receiverId}`),
};
export default messageService;

import { StoreConversation } from './conversation.entity';
import { StoreUser } from './user.entity';

export type StoreMessage = {
  _id: string;
  images: string[];
  conversation: StoreConversation;
  docModel: 'Admin' | 'User';
  text: string;
  sender: StoreUser;
  createdAt: string;
  updatedAt: string;
  seen: boolean;
};

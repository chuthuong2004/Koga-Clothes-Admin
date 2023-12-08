import { StoreUser } from './user.entity';

export type StoreMessage = {
  _id: string;
  images: string[];
  text: string;
  sender: StoreUser;
  createdAt: string;
  updatedAt: string;
  seen: boolean
};

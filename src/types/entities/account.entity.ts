import { GenderUser } from '../unions';
import { StoreUserAddress } from './address.entity';

export type StoreAccount = {
  _id: string;

  email: string;
  username: string;
  password: string;
  phone: string;
  avatar: string;
  firstName: string;
  lastName: string;
  gender: GenderUser;
  birthday: string;
  addresses: StoreUserAddress[];
  createdAt: string;
  updatedAt: string;
  loggedOut: boolean;
  loggedOutAt: string;
};

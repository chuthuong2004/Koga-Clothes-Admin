import { GenderUser } from "../unions";
import { StoreUserAddress } from "./address.entity";
import { StoreFavorite } from "./favorite.entity";

export type StoreUser = {
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
  orders: string[];
  reviews: string[];
  favorites: StoreFavorite[];
  addresses: StoreUserAddress[];
  cart: string;
  createdAt: string;
  updatedAt: string;
  loggedOut: boolean;
  loggedOutAt: string;
};

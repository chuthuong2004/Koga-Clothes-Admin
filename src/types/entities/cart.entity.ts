import { StoreProduct } from "./product.entity";
import { StoreUser } from "./user.entity";

export type StoreCart = {
    _id: string;
  user: StoreUser;
  cartItems: StoreCartItem[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type StoreCartItem = {
    product: StoreProduct;
    quantity: number;
    size: string;
    color: string;
    image: string;
    _id: string;
    repository: string;
}
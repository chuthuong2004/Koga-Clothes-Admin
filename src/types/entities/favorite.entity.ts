import { StoreColor } from "../commons";
import { StoreProduct } from "./product.entity";

export type StoreFavorite = {
    product: StoreProduct;
    size: string;
    color: string;
    colorId: StoreColor['_id'];
    quantity: number;
    _id: string;
  }
  
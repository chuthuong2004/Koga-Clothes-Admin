import { StoreAddress } from './address.entity';
import { StoreUser } from './user.entity';

export type StoreOrder = {
  _id: string;
  orderId: string;
  user: StoreUser;
  orderItems: StoreOrderItem[];
  deliveryInformation: StoreAddress;
  taxPrice: number;
  shippingPrice: number;
  orderStatus: OrderStatus;
  totalPrice: number;
  provisionalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  shippingAt?: string;
  deliveryAt?: string;
  deliveredAt?: string;
  canceledAt?: string;
  canceledReason?: string;
  isEvaluated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type StoreOrderItem = {
  product: string;
  brandName: string;
  image: string;
  quantity: number;
  size: string;
  color: string;
  discount: number;
  price: number;
  name: string;
  _id: string;
};
export type OrderStatus = 'Processing' | 'Shipping' | 'Delivery' | 'Delivered' | 'Canceled';

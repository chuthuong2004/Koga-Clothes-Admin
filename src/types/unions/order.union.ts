import { StoreOrder } from '../entities';
import { EOrderStatus } from '../enums';

export type OrderStatus = keyof typeof EOrderStatus;

export type TimeStatusAt = keyof Pick<
  StoreOrder,
  'shippingAt' | 'paidAt' | 'deliveredAt' | 'deliveryAt' | 'createdAt' | 'canceledAt'
>;

import { StoreOrder } from '../entities';

export type OrderStatus = 'Processing' | 'Shipping' | 'Delivery' | 'Delivered' | 'Canceled';

export type TimeStatusAt = keyof Pick<
  StoreOrder,
  'shippingAt' | 'paidAt' | 'deliveredAt' | 'deliveryAt' | 'createdAt' | 'canceledAt'
>;

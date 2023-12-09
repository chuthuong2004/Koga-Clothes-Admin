import { OrderStatus, TimeStatusAt } from '@/types/unions/order.union';

type StatusCombineTime = Record<OrderStatus, TimeStatusAt>;

export const statusCombineTime: StatusCombineTime = {
  Processing: 'createdAt',
  Shipping: 'shippingAt',
  Delivery: 'deliveryAt',
  Delivered: 'deliveredAt',
  Canceled: 'canceledAt',
};

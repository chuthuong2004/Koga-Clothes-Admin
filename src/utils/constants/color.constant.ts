import { OrderStatus } from '@/types/unions/order.union';

export type ColorStatusOrder = Record<
  OrderStatus,
  {
    color: string;
    backgroundColor: string;
  }
>;

export const colorStatusOrder: ColorStatusOrder = {
  Processing: {
    backgroundColor: '#fef0e4',
    color: '#fba85a',
  },
  Delivered: {
    backgroundColor: '#dff6ea',
    color: '#46cf85',
  },
  Delivery: {
    backgroundColor: '#ddf8fb',
    color: '#36d0e8',
  },
  Shipping: {
    backgroundColor: '#ddf8fb',
    color: '#36d0e8',
  },
  Canceled: {
    backgroundColor: '#fef0e4',
    color: '#8f86f3',
  },
};

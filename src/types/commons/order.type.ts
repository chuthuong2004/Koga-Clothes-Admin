import { OrderStatus } from '../entities';

export type ColorStatusOrder = Record<
  OrderStatus,
  {
    color: string;
    backgroundColor: string;
  }
>;
export type UpdateStatusOrder = Record<
  OrderStatus,
  {
    label: string;
    value: OrderStatus;
  }
>;

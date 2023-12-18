import { OrderStatus } from '../entities';
import { EGenderCategory } from '../enums/category.enum';

export type CategoryGender = Record<
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

export type GenderCategory = {
  label: EGenderCategory;
  value: EGenderCategory;
};

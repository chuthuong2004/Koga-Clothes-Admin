import { GenderCategory } from '../unions';

export type ActionFilter = {
  sort: string;
  filter: FilterProduct;
};

export type FilterProduct = {
  gender: GenderCategory[];
  brand: string[];
  category: string[];
  color: string[];
  size: string[];
  price: string[];
};

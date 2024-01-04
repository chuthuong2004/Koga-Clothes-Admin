import { GenderCategory } from '../unions';

export type ActionFilter = {
  sort: string;
  filter: FilterProduct;
};

export type FilterProduct = {
  gender: string;
  brand: string[];
  category: string[];
  limit: number;
};

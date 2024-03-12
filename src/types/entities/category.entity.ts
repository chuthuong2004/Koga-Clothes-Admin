import { GenderCategory } from '../unions';
import { StoreAdmin } from './admin.entity';

export type StoreCategory = {
  _id: string;
  name: string;
  children: StoreCategory[];
  parent: StoreCategory;
  creator: StoreAdmin;
  slug: string;
  gender: GenderCategory[];
};

import { StoreAdmin } from './admin.entity';

export type StoreCategoryBlog = {
  _id: string;
  name: string;
  children: StoreCategoryBlog[];
  parent: StoreCategoryBlog;
  creator: StoreAdmin;
  slug: string;
};

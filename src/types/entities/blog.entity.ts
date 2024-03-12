import { EModeBlog } from '../enums';
import { StoreAdmin } from './admin.entity';
import { StoreCategoryBlog } from './category-blog.entity';

export type StoreBlog = {
  _id: string;
  title: string;

  image: string;

  summary: string;

  content: string;

  category: StoreCategoryBlog;

  author: StoreAdmin;

  slug: string;

  mode: EModeBlog;

  tags: string[];

  views: number;

  time_public: string;
};

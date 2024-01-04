// Layouts

// Pages
import * as config from '@/config';
import OrderDetail from '@/pages/order-detail';
import React, { ReactNode } from 'react';
import Category from '../pages/category-product';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login/Login';
import Order from '../pages/Order';
import Review from '../pages/Review';
import Brand from '@/pages/brand';
import Chat from '@/pages/chat';
import Customer from '@/pages/customer';
import FormProduct from '@/pages/form-product/FormProduct';
import Product from '@/pages/product';
import Repository from '@/pages/repository';
import Role from '@/pages/role/Role';
import NotPageFound from '../pages/NotPageFound';
import Blog from '@/pages/blogs/Blog';
import CategoryBlog from '@/pages/category-blog';

type routeType = {
  path: string;
  component: React.FC<any>;
  layout?: React.FC<{ children: ReactNode }> | null;
};
const routes: Array<routeType> = [
  {
    path: config.routes.dashboard,
    component: Dashboard,
  },
  {
    path: config.routes.product,
    component: Product,
  },

  {
    path: config.routes.createProduct,
    component: FormProduct,
  },
  {
    path: `${config.routes.product}/edit/:productId`,
    component: FormProduct,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.register,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.order,
    component: Order,
  },
  {
    path: config.routes.orderDetail,
    component: OrderDetail,
  },
  {
    path: config.routes.customer,
    component: Customer,
  },
  {
    path: config.routes.category,
    component: Category,
  },
  {
    path: config.routes.repository,
    component: Repository,
  },
  {
    path: config.routes.brand,
    component: Brand,
  },
  {
    path: config.routes.chat,
    component: Chat,
  },
  {
    path: config.routes.review,
    component: Review,
  },
  {
    path: config.routes.role,
    component: Role,
  },
  {
    path: config.routes.blog,
    component: Blog,
  },
  {
    path: config.routes.categoryBlog,
    component: CategoryBlog,
  },
  {
    path: '*',
    component: NotPageFound,
  },
];
export default routes;

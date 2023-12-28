// Layouts

// Pages
import * as config from '@/config';
import Login from '../pages/Login/Login';
import React, { ReactNode } from 'react';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import Category from '../pages/Category';
import Review from '../pages/Review';
import OrderDetail from '@/pages/order-detail';
// import NotPageFound from '../pages/NotPageFound';
import ProductDetails from '@/pages/product-details/ProductDetails';
import FormProduct from '@/pages/form-product/FormProduct';
import NotPageFound from '../pages/NotPageFound';
import Repository from '@/pages/repository';
import Product from '@/pages/Product';
import Customer from '@/pages/Customer';
import Brand from '@/pages/Brand';
import Chat from '@/pages/Chat';
import Role from '@/pages/role/Role';

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
    path: '*',
    component: NotPageFound,
  },
];
export default routes;

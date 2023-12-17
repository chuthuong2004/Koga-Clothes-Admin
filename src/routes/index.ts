// Layouts

// Pages
import * as config from '@/config';
import Product from '../pages/product';
import Login from '../pages/Login/Login';
import React, { ReactNode } from 'react';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import Customer from '../pages/customer';
import Category from '../pages/Category';
import Brand from '../pages/brand';
import Chat from '../pages/chat';
import Review from '../pages/Review';
import OrderDetail from '@/pages/order-detail';
// import NotPageFound from '../pages/NotPageFound';
import ProductDetails from '@/pages/product-details/ProductDetails';
import FormProduct from '@/pages/form-product/FormProduct';
import NotPageFound from '../pages/NotPageFound';
import Repository from '@/pages/repository';

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
    path: `${config.routes.product}/:productId`,
    component: ProductDetails,
  },
  {
    path: config.routes.createProduct,
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
    path: '*',
    component: NotPageFound,
  },
];
export default routes;

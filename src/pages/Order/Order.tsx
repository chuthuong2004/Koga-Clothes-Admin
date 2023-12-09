import React from 'react';
import './_order.scss';
import { AiFillCaretDown } from 'react-icons/ai';
import { usePagination } from '@/hooks/helpers';
import { orderService } from '@/services';
import { OrderTable } from './components';
import { StatsOrder } from './components/stats';
const Order = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsOrder />
      <OrderTable />
    </div>
  );
};

export default Order;

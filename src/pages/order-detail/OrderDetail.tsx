import { orderService } from '@/services';
import { OrderStatus, StoreOrder } from '@/types/entities';
import { colorStatusOrder } from '@/utils/constants/color.constant';
import { cn } from '@/utils/helpers';
import './_order-detail.scss';
import { Badge, Button } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailModify from './components/order-detail-modify';
import { OrderDetailInfoUser } from './components/order-detail-info-user';

const OrderDetail = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<StoreOrder>();

  useEffect(() => {
    if (!orderId) return;
    const getOrder = async () => {
      const response = await orderService.getById(orderId);
      setOrder(response);
    };
    getOrder();
  }, [orderId]);

  console.log(order);

  const colorStatus = colorStatusOrder[order?.orderStatus as OrderStatus];
  console.log(colorStatus);

  return (
    <div className="h-full ">
      <div className="header w-full flex justify-between">
        <div className="flex gap-4  flex-col">
          <div className="flex gap-3 items-center">
            <span className="title text-4xl font-medium">Order #{orderId}</span>
            <div className="status flex ">
              <div
                className={cn('item-status px-3 py-2 w-max rounded-lg flex items-center  ')}
                style={{
                  backgroundColor: colorStatus?.backgroundColor || 'transparent',
                }}
              >
                <span
                  className={cn('text-xl font-medium')}
                  style={{
                    color: colorStatus?.color || 'transparent',
                  }}
                >
                  {order?.orderStatus}
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <span className="text-2xl text-[#2f2b3d]">
              {moment(order?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        </div>
        <div>
          <Button className="bg-[#ebd4d8] text-[#ef9598] border-0 hover:bg-[#f2bfc3]">
            Delete Order
          </Button>
        </div>
      </div>
      <div className="content flex w-full h-full gap-8 mt-10">
        <div className="info-detail-order  flex-2">
          <OrderDetailModify order={order} />
        </div>
        <div className="info-detail-user flex-1 ">
          <OrderDetailInfoUser order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

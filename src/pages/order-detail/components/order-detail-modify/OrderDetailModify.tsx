import { StoreOrder } from '@/types/entities';
import { Button, Card } from 'antd';
import React from 'react';

type OrderProps = {
  order?: StoreOrder;
};
const OrderDetailModify: React.FC<OrderProps> = ({ order }) => {
  return (
    <Card
      title={
        <div className="flex justify-between">
          <span>Order Details</span>
          <Button className="bg-transparent text-primary hover:bg-backgroundButton border-0">
            Edit
          </Button>
        </div>
      }
      className="flex flex-col gap-3"
    >
      <div>table owr day</div>
      <div className="flex flex-col">
        <div className="flex flex-col  justify-start">
          <div>
            <span className="text-[#2f2b3d] text-2xl mr-2">Subtotal:</span>
            <span className="text-[#2f2b3d] text-2xl mr-2">
              {order?.totalPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
          <div>
            <span className="text-[#2f2b3d] text-2xl mr-2">Shipping total:</span>
            <span className="text-[#2f2b3d] text-2xl mr-2">
              {order?.shippingPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
          <div>
            <span className="text-[#2f2b3d] text-2xl mr-2">Tax:</span>
            <span className="text-[#2f2b3d] text-2xl mr-2">
              {order?.taxPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
          <div>
            <span className="text-[#2f2b3d] text-2xl mr-2">Total:</span>
            <span className="text-[#2f2b3d] text-2xl mr-2">{order?.totalPrice}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderDetailModify;

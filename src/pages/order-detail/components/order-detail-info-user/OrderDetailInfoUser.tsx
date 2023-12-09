import { StoreOrder } from '@/types/entities/order.entity';
import { Avatar, Button, Card } from 'antd';
import React from 'react';
import { IoCartOutline } from 'react-icons/io5';

type Props = {
  order?: StoreOrder;
};

const OrderDetailInfoUser: React.FC<Props> = ({ order }) => {
  return (
    <div className="flex flex-col gap-10">
      {order ? (
        <>
          <Card title="Customer Detail">
            <div className="flex flex-col gap-10">
              <div className="flex gap-3">
                <Avatar size={'large'} src={process.env.REACT_APP_API_URL + order.user.avatar} />
                <span className=" text-text-color text-2xl font-medium">
                  {order.deliveryInformation.lastName + ' ' + order.deliveryInformation.firstName}
                </span>
              </div>
              <div className=" flex gap-3 items-center">
                <Avatar
                  className="flex items-center justify-center bg-[#d3eadd]"
                  size={'large'}
                  icon={<IoCartOutline color="#23b564" />}
                />
                <span className="text-text-color text-2xl font-medium">
                  {order?.orderItems.length} items
                </span>
              </div>
              <div className=" ">
                <div className="flex justify-between w-full">
                  <span className="text-2xl font-medium text-text-color">Contact Info</span>
                  <Button className="bg-transparent text-primary text-2xl font-medium hover:bg-[#f2bfc3] border-0">
                    Edit
                  </Button>
                </div>
                <div>
                  <span className="text-text-color-secondary text-2xl ">
                    Mobile: {order?.deliveryInformation.phone}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          <Card
            title={
              <div className="flex justify-between">
                <span className="text-text-color text-2xl font-medium">Shipping Address</span>
                <Button className="bg-transparent text-primary text-2xl font-medium hover:bg-[#f2bfc3] border-0">
                  Edit
                </Button>
              </div>
            }
          >
            <div className="flex flex-col gap-2">
              <span className="item-address">{order.deliveryInformation.province}</span>
              <span className="item-address">{order.deliveryInformation.district}</span>
              <span className="item-address">{order.deliveryInformation.ward}</span>
              <span className="item-address">{order.deliveryInformation.specific}</span>
            </div>
          </Card>
          <div></div>
        </>
      ) : null}
    </div>
  );
};

export default OrderDetailInfoUser;

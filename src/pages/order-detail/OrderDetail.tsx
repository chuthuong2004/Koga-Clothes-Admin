import { orderService } from '@/services';
import { OrderStatus } from '@/types/entities';
import { FORMAT_DATE } from '@/utils/constants';
import { colorStatusOrder } from '@/utils/constants/color.constant';
import {
  OptionsStatusOrderDefault,
  OptionsUpdateStatusOrder,
} from '@/utils/constants/order.constant';
import { cn } from '@/utils/helpers';
import { Button, Steps, StepsProps } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import './_order-detail.scss';
import { OrderDetailInfoUser } from './components/order-detail-info-user';
import OrderDetailModify from './components/order-detail-modify';

const OrderDetail = () => {
  const { orderId } = useParams();

  const { data: order, mutate } = useSWR(
    `OrderDetails${orderId}`,
    () => {
      return orderId ? orderService.getById(orderId) : undefined;
    },
    {
      onError(err, key, config) {
        console.log(err);
      },
    },
  );

  console.log(order);

  const colorStatus = colorStatusOrder[order?.orderStatus as OrderStatus];
  const [currentStep, setCurrentStep] = useState<number>(3);

  const [itemSteps, setItemSteps] = useState<StepsProps['items']>([]);

  useEffect(() => {
    const itemsStep: StepsProps['items'] = Object.keys(OptionsStatusOrderDefault).map(
      (key: string, index: number) => {
        const storeValue = OptionsStatusOrderDefault[key as OrderStatus];
        let disabled = false;
        if (order?.orderStatus === key) {
          setCurrentStep(index);
          disabled = true;
        }
        return {
          title: storeValue.value,
          description: storeValue.label,
          disabled,
        };
      },
    );
    setItemSteps(itemsStep);
  }, []);

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
              {moment(order?.createdAt).format(FORMAT_DATE)}
            </span>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <Button className="bg-danger text-primary hover:bg-danger-hover">Delete Order</Button>
        </div>
      </div>
      <div className="content flex flex-col w-full h-full gap-8 mt-10">
        <div className="flex flex-col">
          <Steps
            current={currentStep}
            items={itemSteps}
            onChange={async (current: number) => {
              const itemStepCurrent = itemSteps?.[currentStep];
              const statusNext = OptionsUpdateStatusOrder[itemStepCurrent?.title as OrderStatus];
              const itemStepNext = itemSteps?.[current];
              if (itemStepNext?.title !== statusNext.value) return;
              setCurrentStep(current);
              try {
                const newOrder = await orderService.updateOrder(order?._id || '', {
                  orderStatus: itemStepNext?.title as OrderStatus,
                });
                mutate({ ...newOrder });
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
        <div className="info-detail-order  flex-2">
          <OrderDetailModify order={order} />
        </div>
        <div className="info-detail-user f  lex-1 ">
          <OrderDetailInfoUser order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

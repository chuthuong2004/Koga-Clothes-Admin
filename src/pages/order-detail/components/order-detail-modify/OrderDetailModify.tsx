import { OrderStatus, StoreOrder } from '@/types/entities';
import { Button, Card } from 'antd';
import React from 'react';
import DataTable, { Alignment, Direction } from 'react-data-table-component';
import { columns } from './column';
import { StatusOrderItem } from '../status-order-item';
import { statusCombineTime } from '../../constrants';

type OrderProps = {
  order?: StoreOrder;
};
type TimeStatusOrder = {
  status: OrderStatus;
  timeAt: string;
};
const OrderDetailModify: React.FC<OrderProps> = ({ order }) => {
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const timesStatusOrder: TimeStatusOrder[] = Object.keys(statusCombineTime).map((key) => {
    const fieldTime = statusCombineTime[key as OrderStatus];
    return {
      status: key as OrderStatus,
      timeAt: order?.[fieldTime]!,
    };
  });

  console.log(order);
  return (
    <div className="flex flex-col gap-10">
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
        <div className="border rounded-lg mb-10">
          <DataTable
            columns={columns}
            selectableRows
            data={order?.orderItems || []}
            pagination={false}
            responsive
            noHeader
            subHeaderWrap
            subHeaderAlign={Alignment.CENTER}
            direction={Direction.LTR}
            customStyles={{
              cells: {
                style: {
                  paddingTop: 10,
                  paddingBottom: 10,
                },
              },
              subHeader: {
                style: {
                  // borderRadius: 20,
                },
              },
            }}
            paginationComponentOptions={paginationComponentOptions}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex  justify-end">
            <div className="flex flex-col w-max gap-2">
              <div className="item-info-price">
                <span className="text-[#2f2b3d] text-2xl mr-2">Subtotal:</span>
                <span className="text-[#2f2b3d] text-2xl mr-2">
                  {order?.totalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
              <div className="item-info-price">
                <span className="text-[#2f2b3d] text-2xl mr-2">Shipping total:</span>
                <span className="text-[#2f2b3d] text-2xl mr-2">
                  {order?.shippingPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
              <div className="item-info-price">
                <span className="text-[#2f2b3d] text-2xl mr-2">Tax:</span>
                <span className="text-[#2f2b3d] text-2xl mr-2">
                  {order?.taxPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
              <div className="item-info-price">
                <span className="text-[#2f2b3d] text-2xl mr-2">Total:</span>
                <span className="text-[#2f2b3d] text-2xl mr-2">
                  {order?.totalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card title={'Shipping Activity'}>
        {timesStatusOrder?.map((item: TimeStatusOrder, index: number) => (
          <StatusOrderItem
            status={item?.status}
            timeAt={item?.timeAt}
            showLine={timesStatusOrder?.length - 1 !== index}
          />
        ))}
      </Card>
    </div>
  );
};

export default OrderDetailModify;

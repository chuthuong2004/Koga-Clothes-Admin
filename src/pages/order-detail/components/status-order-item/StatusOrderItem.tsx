import { OrderStatus } from '@/types/unions/order.union';
import { cn } from '@/utils';
import moment from 'moment';
import React from 'react';

type StatusOrderItemProps = {
  status?: OrderStatus;
  timeAt?: string;
  showLine?: boolean;
};
const StatusOrderItem: React.FC<StatusOrderItemProps> = ({ status, timeAt, showLine = true }) => {
  console.log(timeAt);
  return (
    <div className="  min-h-[6rem] ">
      <div className="h-max flex  items-center gap-10">
        <div
          className={cn('dot w-6 h-6 rounded-full bg-[#8d8f92] relative', timeAt && 'bg-primary')}
        >
          {showLine ? (
            <span
              className={cn(
                'line w-[0.1rem] h-[6rem]  bg-[#8d8f92] absolute left-1/2 -translate-x-1/2',
                timeAt && 'bg-primary',
              )}
            ></span>
          ) : null}
        </div>

        <span className="text-text-color text-2xl font-medium flex-1">{status}</span>
        <span className="time text-text-color-secondary text-lg">
          {timeAt && moment(timeAt).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      </div>
    </div>
  );
};

export default StatusOrderItem;

import { orderService } from '@/services';
import { Card, Typography } from 'antd';
import React from 'react';
import  useSWR  from 'swr';

const StatsOrder = () => {
  const {data:order} = useSWR('ListOrdersStash',()=>orderService.getAll({
    page:1,limit:10000,offset:0
  }))
  console.log(order)
  return (
    <div className="flex gap-12">
      <Card className="flex-1" bordered={false}>
        <div>
          <Typography className="text-4xl font-medium text-text-color">{order?.totalDocs}</Typography>
          <Typography className="text-2xl font-medium text-text-color">Quantity Orders</Typography>
        </div>
      </Card>
      <Card className="flex-1" bordered={false}>
        <div>
          <Typography>In-Store Sales</Typography>
          <Typography className="text-base">$5,345.43</Typography>
        </div>
      </Card>
      <Card className="flex-1" bordered={false}>
        <div>
          <Typography>In-Store Sales</Typography>
          <Typography className="text-base">$5,345.43</Typography>
        </div>
      </Card>
      <Card className="flex-1" bordered={false}>
        <div>
          <Typography>In-Store Sales</Typography>
          <Typography className="text-base">$5,345.43</Typography>
        </div>
      </Card>
    </div>
  );
};

export default StatsOrder;

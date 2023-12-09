import { Card, Typography } from 'antd';
import React from 'react';

const StatsProduct = () => {
  return (
    <div className="flex gap-12">
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
      <Card className="flex-1" bordered={false}>
        <div>
          <Typography>In-Store Sales</Typography>
          <Typography className="text-base">$5,345.43</Typography>
        </div>
      </Card>
    </div>
  );
};

export default StatsProduct;

import { Card, Typography } from 'antd';
import React from 'react';

const StatsRepository = () => {
  return (
    <div className="grid grid-cols-4 gap-12">
      <Card className="flex-1" bordered={false}>
        <div className='flex flex-col'>
          <Typography.Text>In-Store Sales</Typography.Text>
          <Typography.Text className='font-medium' >$5,345.43</Typography.Text>
        </div>
      </Card>
      <Card className="flex-1" bordered={false}>
        <div className='flex flex-col'>
          <Typography.Text>In-Store Sales</Typography.Text>
          <Typography.Text className='font-medium' >$5,345.43</Typography.Text>
        </div>
      </Card>
      <Card className="flex-1" bordered={false}>
        <div className='flex flex-col'>
          <Typography.Text>In-Store Sales</Typography.Text>
          <Typography.Text className='font-medium' >$5,345.43</Typography.Text>
        </div>
      </Card>
      <Card className="flex-1" bordered={false}>
        <div className='flex flex-col'>
          <Typography.Text>In-Store Sales</Typography.Text>
          <Typography.Text className='font-medium' >$5,345.43</Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default StatsRepository;

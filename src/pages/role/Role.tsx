import { Space, Typography } from 'antd';
import React from 'react';
import { ListRoles } from './components';

const Role = () => {
  return (
    <div>
      <Space direction="vertical">
        <Typography.Title level={4}>Roles list</Typography.Title>
        <div className="container">
          <ListRoles />
        </div>
      </Space>
    </div>
  );
};

export default Role;

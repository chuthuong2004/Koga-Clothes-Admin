import { Space, Typography } from 'antd';
import React from 'react';
import { ListRoles } from './components';
import TableAdmins from './components/table-admins';

const Role = () => {
  return (
    <div>
      <Space direction="vertical">
        <Typography.Title level={4}>Roles list</Typography.Title>
        <div className="container flex flex-col gap-10">
          <ListRoles />
          <TableAdmins />
        </div>
      </Space>
    </div>
  );
};

export default Role;

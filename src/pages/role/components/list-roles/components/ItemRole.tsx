import { usePagination } from '@/hooks/helpers';
import { authService } from '@/services';
import { StoreAdmin, StoreRole } from '@/types/entities';
import { Card, Typography } from 'antd';
import React from 'react';
import { HiOutlineDuplicate } from 'react-icons/hi';

type ItemRoleProps = {
  role: StoreRole;
};

const ItemRole: React.FC<ItemRoleProps> = ({ role }) => {
  const { data: listStaffs } = usePagination<StoreAdmin>(
    'ListStaffs',
    {
      page: 1,
      limit: 10,
      offset: 0,
      role: role._id,
    },
    authService.getAllStaffs,
  );
  console.log(listStaffs);
  return (
    <Card className="min-w-[45rem] h-[15rem]">
      <Typography.Title level={3}>{role.name}</Typography.Title>
      <div className="actions flex justify-between">
        <Typography.Text>Edit role</Typography.Text>
        <span>
          <HiOutlineDuplicate className="text-4xl text-text-color-secondary" />
        </span>
      </div>
    </Card>
  );
};

export default ItemRole;

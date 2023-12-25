import { usePagination } from '@/hooks/helpers';
import { roleService } from '@/services/role.service';
import { StoreRole } from '@/types/entities';
import { Space } from 'antd';
import React from 'react';
import { ItemRole } from './components';

const ListRoles = () => {
  const { data: listRoles } = usePagination<StoreRole>(
    'ListRoles',
    {
      page: 1,
      limit: 10,
      offset: 0,
    },
    roleService.getAll,
  );

  console.log(listRoles?.docs);

  return (
    <Space>
      <div className="flex gap-10 flex-wrap">
        {listRoles?.docs.map((role) => <ItemRole role={role} />)}
      </div>
    </Space>
  );
};

export default ListRoles;

import { StorePermission } from '@/types/entities';
import { Action } from '@/types/enums/role.enum';
import { Checkbox, Typography } from 'antd';
import React from 'react';

type ListActionsProps = {
  permissions: StorePermission[];
};

type UnionAction = keyof typeof Action;

const ListActions: React.FC<ListActionsProps> = ({ permissions }) => {
  return (
    <div className="flex gap-20 ">
      {Object.keys(Action).map((action) => {
        const isChecked = permissions.find(
          (permission) => permission.action === Action[action as UnionAction],
        );
        return (
          <div className="flex gap-1">
            <Checkbox checked={!!isChecked} />
            <Typography.Text>{action}</Typography.Text>
          </div>
        );
      })}
    </div>
  );
};

export default ListActions;

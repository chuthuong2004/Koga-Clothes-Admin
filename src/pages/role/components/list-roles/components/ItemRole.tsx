import { usePagination } from '@/hooks/helpers';
import { useToggle } from '@/hooks/utils';
import { authService } from '@/services';
import { StoreAdmin, StoreRole } from '@/types/entities';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Card, Typography } from 'antd';
import React from 'react';
import { HiOutlineDuplicate } from 'react-icons/hi';
import ModalRole from '../../modal-role';

type ItemRoleProps = {
  role: StoreRole;
};

const ItemRole: React.FC<ItemRoleProps> = ({ role }) => {
  console.log(role._id);
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
  const { isOpen, toggle } = useToggle(false);
  console.log(listStaffs);
  return (
    <Card className="min-w-[45rem] h-[15rem] justify-between flex flex-col">
      <div className="flex justify-between items-center">
        <Typography.Title level={3}>{role.name}</Typography.Title>
        <Avatar.Group>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          <a href="https://ant.design">
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          </a>
        </Avatar.Group>
      </div>
      <div className="actions flex justify-between">
        <Typography.Text onClick={toggle}>Edit role</Typography.Text>
        <ModalRole open={isOpen} onCancel={toggle} />
        <span>
          <HiOutlineDuplicate className="text-4xl text-text-color-secondary" />
        </span>
      </div>
    </Card>
  );
};

export default ItemRole;

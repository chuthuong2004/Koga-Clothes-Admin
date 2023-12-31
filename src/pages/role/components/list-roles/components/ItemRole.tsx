import { BASE_URL } from '@/config';
import { useToggle } from '@/hooks/utils';
import { roleService } from '@/services/role.service';
import { StoreRole } from '@/types/entities';
import { getFirstLetter, randomBgAvatar } from '@/utils';
import { Avatar, Card, Tooltip, Typography } from 'antd';
import React from 'react';
import { HiOutlineDuplicate } from 'react-icons/hi';
import useSWR from 'swr';
import ModalRole from '../../modal-role';

type ItemRoleProps = {
  role: StoreRole;
};

const ItemRole: React.FC<ItemRoleProps> = ({ role }) => {
  const { data: listStaffs } = useSWR(
    `GetListStaffByRole${role._id}`,
    () => roleService.getAllStaffByRole(role._id),
  );
  const { isOpen, onClose, toggle } = useToggle(false);
  console.log("listStaffs: ", listStaffs);
  return (
    <Card bordered={false} >
      <div className="flex flex-col gap-4">
        <div className='flex justify-between items-center gap-4 text-slate-200'>
          <Typography.Text>Tổng số {listStaffs?.length} người dùng</Typography.Text>
          <Avatar.Group
            maxCount={4}
            maxPopoverTrigger="click"
            size="default"
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
          >
            {
              listStaffs?.map((staff, index) => {
                return <Tooltip title={staff.firstName + ' ' + staff.lastName} placement="top">
                  <Avatar style={{ backgroundColor: randomBgAvatar() }} src={staff.avatar ? BASE_URL + staff.avatar : undefined}>{getFirstLetter(staff.firstName + ' ' + staff.lastName)}</Avatar>
                </Tooltip>
              }
              )
            }
          </Avatar.Group>
        </div>
        <div className="flex flex-col">
          <Typography.Text className='font-semibold text-2xl'>{role.name}</Typography.Text>
          <Typography.Text className='text-slate-500 text-xl'>Có {role.permissions.length} permissions</Typography.Text>
        </div>
        <div className="flex justify-between items-center gap-4">
          {!role.default && <div >
            <Typography.Text onClick={toggle} className='text-primary font-medium cursor-pointer'>Edit role</Typography.Text>
          </div>}
          <div>
            <HiOutlineDuplicate className="text-4xl text-text-color-secondary" />
          </div>
        </div>
      </div>

      <ModalRole open={isOpen} onCancel={onClose} role={role} onClose={onClose} />
    </Card>
  );
};

export default ItemRole;

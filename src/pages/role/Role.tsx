import { Typography } from 'antd';
import { ListRoles } from './components';
import TableAdmins from './components/table-admins';

const Role = () => {
  return (
    <div>
      <Typography.Title level={4}>Roles list</Typography.Title>
      <div className="flex flex-col gap-10">
        <ListRoles />
        <TableAdmins />
      </div>
    </div>
  );
};

export default Role;

import { roleService } from '@/services/role.service';
import useSWR from 'swr';
import { AddRole, ItemRole } from './components';

const ListRoles = () => {
  const { data: listRoles } = useSWR(
    'ListRoles',
    roleService.getAll,
  );
  console.log("role: ", listRoles);

  return (
    <div className="grid grid-cols-3 gap-8">
      {listRoles?.map((role) => <ItemRole role={role} />)}
      <AddRole />
    </div>
  );
};

export default ListRoles;

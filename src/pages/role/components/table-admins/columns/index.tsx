import { StoreAdmin } from '@/types/entities';
import { ROLE } from '@/utils/constants/role.constant';
import { Typography } from 'antd';
import { TableColumn } from 'react-data-table-component';
import ActionColumn from './ActionColumn';
import { ERoleDefault } from '@/types/enums/role.enum';

export const columns: TableColumn<StoreAdmin>[] = [
  {
    id: '_id',
    name: 'ID',
    selector: (row) => row._id,
  },
  {
    id: 'name',
    name: 'NAME',
    selector: (row) => row.username,
    cell: (row, index, column, id) => {
      return (
        <Typography className="line-clamp-1 font-semibold">
          {row.lastName + ' ' + row.firstName}
        </Typography>
      );
    },
  },
  {
    id: 'role',
    name: 'ROLE',
    // selector: (row) => row.roles,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-1">
          {row.roles.map((role) => {
            const RoleMapping = ROLE[role.name as ERoleDefault || 'Staff' ];

            return (
              <div
                className="flex gap-2 items-center p-1 px-2 rounded-lg"
                style={{
                  backgroundColor: RoleMapping?.backgroundColor,
                }}
              >
                {RoleMapping?.icon}
                <Typography
                  style={{
                    color: RoleMapping?.color,
                  }}
                  className={`text-[${RoleMapping?.color}]`}
                >
                  {RoleMapping?.value}
                </Typography>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: 'email',
    name: 'EMAIL',
    selector: (row) => row.email,
    cell: (row, index, column, id) => {
      return (
        <div>
          <Typography className="font-bold">{row.email}</Typography>
        </div>
      );
    },
  },
  {
    id: 'phone',
    name: 'PHONE',
    selector: (row) => row.phone,
    cell: (row, index, column, id) => {
      return (
        <div>
          <Typography className="font-bold">{row.phone}</Typography>
        </div>
      );
    },
  },

  {
    id: 'actions',
    name: 'ACTIONS',
    cell: (row, index, column, id) => {
      return <ActionColumn data={row} />;
    },
  },
];

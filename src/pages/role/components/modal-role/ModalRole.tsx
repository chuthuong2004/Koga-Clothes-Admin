import { usePagination } from '@/hooks/helpers';
import { ResponsePaginate } from '@/types/commons';
import { StoreRole } from '@/types/entities';
import { Button, Checkbox, Modal, ModalProps, Typography } from 'antd';
import React from 'react';
import DataTable, { Alignment, TableColumn } from 'react-data-table-component';
import useSWR from 'swr';
import ListActions from './components/list-actions';

type ModalRoleProps = ModalProps;

const columns: TableColumn<StoreRole>[] = [
  {
    id: 'name',
    name: 'NAME',
    selector: (row) => row.name,
    cell: (row, index, column, id) => {
      return <Typography className="line-clamp-1 font-semibold">{row.name}</Typography>;
    },
  },
  {
    id: 'permissions',
    name: (
      <div className="flex gap-3">
        <Checkbox />
        <Typography.Text>SELECT ALL</Typography.Text>
      </div>
    ),

    // selector: (row) => row.roles,
    width: '75%',
    cell: (row, index, column, id) => {
      return <ListActions permissions={row.permissions} />;
    },
  },
];

const ModalRole: React.FC<ModalRoleProps> = ({ ...passProps }) => {
  const { data } = useSWR<ResponsePaginate<StoreRole>>('ListRoles');
  return (
    <Modal
      {...passProps}
      width={890}
      footer={
        <div className=" flex justify-center">
          <Button key="submit" type="primary">
            Submit
          </Button>
          <Button key="back">Cancel</Button>
        </div>
      }
    >
      <Typography.Title level={3}>Edit Role</Typography.Title>
      <Typography.Text>Set role permission</Typography.Text>
      <DataTable columns={columns} data={data?.docs || []} subHeaderAlign={Alignment.RIGHT} />
    </Modal>
  );
};

export default ModalRole;

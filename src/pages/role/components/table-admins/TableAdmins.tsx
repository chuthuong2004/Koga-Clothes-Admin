import { usePagination } from '@/hooks/helpers';
import { authService } from '@/services';
import React from 'react';
import DataTable, { Alignment, Direction } from 'react-data-table-component';
import { CustomHeader } from './components';
import { columns } from './columns';

const TableAdmins = () => {
  const { data } = usePagination(
    'listTableAdmins',
    {
      page: 1,
      limit: 10,
      offset: 0,
    },
    authService.getAllStaffs,
  );
  console.log(data);
  return (
    <div className="flex flex-col">
      <DataTable
        columns={columns}
        selectableRows
        data={data?.docs || []}
        pagination
        responsive
        noHeader
        subHeaderWrap
        subHeaderAlign={Alignment.CENTER}
        subHeader
        subHeaderComponent={<CustomHeader />}
        direction={Direction.LTR}
        customStyles={{
          cells: {
            style: {
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
          subHeader: {
            style: {
              // borderRadius: 20,
            },
          },
        }}
      />
    </div>
  );
};

export default TableAdmins;

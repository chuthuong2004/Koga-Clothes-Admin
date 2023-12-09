import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { usePagination } from '@/hooks/helpers';
import { productService } from '@/services';
import { StoreProduct } from '@/types/entities';
import { Button, Card, Image, Typography } from 'antd';
import { columns } from './columns';
const OrderTable = () => {
  const { data } = usePagination(
    'ListProducts',
    {
      page: 1,
      limit: 10,
      offset: 0,
    },
    productService.getAll,
  );

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  // const columns: TableColumn<StoreProduct>[] = [
  //     {
  //         id: 'name',
  //         name: 'PRODUCT',
  //         selector: row => row.name,
  //         cell: (row, index, column, id) => {
  //             return <div className='w-28'>
  //                 <Image className="rounded-lg"  src={process.env.REACT_APP_API_URL + row.storedProducts[0].colors[0].images[0]} />
  //             </div>
  //         }
  //     },
  //     {
  //         id: 'category',
  //         name: 'CATEGORY',
  //         selector: row => row.category.name,
  //         cell: (row, index, column, id) => {
  //             return <div>
  //                 <Typography>{row.category.name}</Typography>
  //             </div>
  //         }
  //     },
  //     {
  //         name: 'PRICE',
  //         selector: row => row.price,
  //         cell: (row, index, column, id) => {
  //             return <div>
  //                 <Typography className="font-bold">{row.price.toLocaleString('VN')} đ</Typography>
  //             </div>
  //         }
  //     },
  // ];
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex justify-between items-center">
        <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>
        <Button type="primary" size="large">
          Thêm mới sản phẩm
        </Button>
      </Card>
      <DataTable
        title="Danh sách sản phẩm"
        columns={columns}
        selectableRows
        data={data?.docs || []}
        pagination
        actions={<div></div>}
        responsive
        subHeader={
          <Card>
            <Button type="primary">Hi</Button>
            <Button type="primary">Hi</Button>
            <Button type="primary">Hi</Button>
            <Button type="primary">Hi</Button>
          </Card>
        }
        className="rounded-l-full"
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};

export default OrderTable;

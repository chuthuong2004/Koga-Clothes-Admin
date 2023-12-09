import { StoreOrderItem } from '@/types/entities/order.entity';
import { TableColumn } from 'react-data-table-component';
import { Image, Typography } from 'antd';
import { KeyOfProvince } from '../../../../../types/entities/province.entity';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

export const columns: TableColumn<StoreOrderItem>[] = [
  {
    id: 'name',
    name: 'PRODUCT',
    width: '35%',
    selector: (row) => row.name,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-start flex-col">
          <div className="flex-1 items-center">
            <Typography className="line-clamp-1 font-semibold">{row.name}</Typography>
          </div>
          <div className="w-28">
            <Image className="rounded-lg" src={process.env.REACT_APP_API_URL + row.image} />
          </div>
        </div>
      );
    },
  },
  {
    id: 'price',
    name: 'PRICE',
    selector: (row) => row.price,
    cell: (row, index, column, id) => {
      return (
        <div>
          <Typography className="font-bold">
            {(row.price - (row.price * row.discount) / 100).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}{' '}
          </Typography>
        </div>
      );
    },
  },
  {
    id: 'quantity',
    name: 'QUANTITY',
    selector: (row) => row.quantity,
    cell: (row, index, column, id) => {
      return (
        <div>
          <Typography className="font-bold">{row.quantity} </Typography>
        </div>
      );
    },
  },
  {
    id: 'total',
    name: 'TOTAL',
    // selector: (row) => row.brand.name,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-2">
          <Typography className="text-error">
            {(
              row.price * row.quantity -
              row.price * row.quantity * (row.discount / 100)
            ).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}{' '}
          </Typography>
        </div>
      );
    },
  },
  {
    id: 'actions',
    name: 'ACTIONS',
    // selector: (row) => row.brand.name,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-2 items-center">
          <FaRegEdit size={20} className="text-primary cursor-pointer" />
          <FaTrashAlt size={20} className="text-primary cursor-pointer" />
        </div>
      );
    },
  },
];

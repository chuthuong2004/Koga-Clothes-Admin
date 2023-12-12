import { OrderStatus, StoreOrder, StoreProduct } from '@/types/entities';
import { FORMAT_DATE, cn } from '@/utils';
import { colorStatusOrder } from '@/utils/constants/color.constant';
import { Button, Image, Typography } from 'antd';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@/config';

export const columns: TableColumn<StoreOrder>[] = [
  {
    id: '_id',
    name: 'ID',
    selector: (row) => row.orderId,
  },
  {
    id: 'date',
    name: 'DATE',
    width: '35%',
    selector: (row) => row.createdAt,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-center">
          <div className="flex-1 items-center">
            <Typography className="line-clamp-1 font-semibold">
              {moment(row.canceledAt).format(FORMAT_DATE)}
            </Typography>
          </div>
        </div>
      );
    },
  },
  {
    id: 'customer',
    name: 'CUSTOMER',
    selector: (row) => row.deliveryInformation.firstName,
    cell: (row, index, column, id) => {
      return (
        <div>
          <Typography>
            {row.deliveryInformation.lastName + ' ' + row.deliveryInformation.firstName}
          </Typography>
        </div>
      );
    },
  },
  {
    id: 'payment',
    name: 'PAYMENT',
    selector: (row) => row.orderStatus,
    cell: (row, index, column, id) => {
      const colorStatus = colorStatusOrder[row?.orderStatus as OrderStatus];

      return (
        <div
          className="px-3 py-2 w-max rounded-lg flex items-center"
          style={{
            backgroundColor: colorStatus?.backgroundColor || 'transparent',
          }}
        >
          <Typography
            className={cn('text-xl font-medium')}
            style={{
              color: colorStatus?.color || 'transparent',
            }}
          >
            {row?.orderStatus}
          </Typography>
        </div>
      );
    },
  },

  {
    id: 'actions',
    name: 'ACTIONS',
    selector: (row) => row.orderId,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-2 items-center">
          <Link to={'/order-detail/' + row.orderId}>
            <FaRegEdit size={20} className="text-primary cursor-pointer" />
          </Link>
          <FaTrashAlt size={20} className="text-primary cursor-pointer" />
        </div>
      );
    },
  },
];

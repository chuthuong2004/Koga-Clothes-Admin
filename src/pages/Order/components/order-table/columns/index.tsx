import { OrderStatus, StoreOrder, StoreProduct } from '@/types/entities';
import { FORMAT_DATE, cn, getFirstLetter, randomBgAvatar } from '@/utils';
import { colorStatusOrder } from '@/utils/constants/color.constant';
import { Avatar, Button, Image, Typography } from 'antd';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@/config';

export const columns: TableColumn<StoreOrder>[] = [
  {
    id: '_id',
    name: 'Mã đơn',
    selector: (row) => row.orderId,
    cell(row, rowIndex, column, id) {
      return <Typography.Text className='font-bold'>{row.orderId}</Typography.Text>
    },
  },
  {
    id: 'date',
    name: 'Ngày tạo đơn',
    selector: (row) => row.createdAt,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-center">
          <div className="flex-1 items-center">
            <Typography className="">
              {moment(row.createdAt).format(FORMAT_DATE)}
            </Typography>
          </div>
        </div>
      );
    },
  },
  {
    id: '',
    name: 'Sản phẩm',
    width: '25%',
    selector: (row) => row.orderItems[0]._id,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-center">
          <div className="w-28">
            <Image
              className="rounded-lg"
              src={process.env.REACT_APP_API_URL + row.orderItems[0].image}
            />
          </div>
          <div className="flex-1 items-center">
            <Typography className="line-clamp-1 font-semibold">{row.orderItems[0].brandName} - {row.orderItems[0].name}</Typography>
            <div className='flex items-center gap-4 flex-wrap'>
              <Typography className="" >Màu sắc: {row.orderItems[0].color}</Typography>
              <Typography className="" >Kích cỡ: {row.orderItems[0].size}</Typography>
              <Typography className="" >Số lượng: {row.orderItems[0].quantity}</Typography>
            </div>
            {row.orderItems.length > 1 &&
              <div>
                <Typography.Text>+{row.orderItems.length - 1} sản phẩm khác</Typography.Text>
              </div>
            }
          </div>
        </div>
      );
    },
  },
  {
    id: 'customer',
    name: 'Khách hàng',
    selector: (row) => row.deliveryInformation.firstName,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Avatar style={{ backgroundColor: randomBgAvatar() }} size="large" >
            {getFirstLetter(row.deliveryInformation.firstName + ' ' + row.deliveryInformation.lastName)}
          </Avatar>
          <Typography>{row.deliveryInformation.firstName + ' ' + row.deliveryInformation.lastName}</Typography>
        </div>
      );
    },
  },
  {
    id: 'totalPrice',
    name: 'Tổng tiền',
    selector: (row) => row.totalPrice,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Typography.Text className='font-bold'>{row.totalPrice.toLocaleString("VN")} đ</Typography.Text>
        </div>
      );
    },
  },
  {
    id: 'orderStatus',
    name: 'Trạng thái',
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

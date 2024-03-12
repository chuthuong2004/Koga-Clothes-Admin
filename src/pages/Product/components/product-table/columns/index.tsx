import { StoreProduct } from '@/types/entities';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Image, Typography } from 'antd';
import { TableColumn } from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import ActionColumn from './ActionColumn';

export const columns: TableColumn<StoreProduct>[] = [
  {
    id: '_id',
    name: 'ID',
    selector: (row) => row.code,
  },
  {
    id: 'name',
    name: 'PRODUCT',
    width: '35%',
    selector: (row) => row.name,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-center">
          <div className="w-28">
            <Image
              className="rounded-lg"
              src={process.env.REACT_APP_API_URL + row.storedProducts[0].colors[0].images[0]}
            />
          </div>
          <div className="flex-1 items-center">
            <Typography className="line-clamp-1 font-semibold">{row.name}</Typography>
            <Typography className="line-clamp-2" dangerouslySetInnerHTML={{__html: row.description}}></Typography>
          </div>
        </div>
      );
    },
  },
  {
    id: 'category',
    name: 'CATEGORY',
    selector: (row) => row.category.name,
    cell: (row, index, column, id) => {
      return (
        <div>
          <Typography>{row.category.name}</Typography>
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
          <Typography className="font-bold">{row.price.toLocaleString('VN')} đ</Typography>
        </div>
      );
    },
  },
  {
    id: 'brand',
    name: 'BRAND',
    selector: (row) => row.brand.name,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-2">
          <Image
            width={100}
            className="object-contain"
            src={
              'https://file.hstatic.net/1000284478/file/birkenstock_ff8c7d7b36e14c668d761dc268c82763.webp'
            }
          />

          <Typography className="text-error">{row.brand.name}</Typography>
        </div>
      );
    },
  },
  {
    id: 'actions',
    name: 'ACTIONS',
    selector: (row) => row.brand.name,
    cell: (row, index, column, id) => {
      return (
        <ActionColumn product={row}/>
      );
    },
  },
];

import { StoreBrand, StoreRepository } from '@/types/entities';
import { Avatar, Image, Typography } from 'antd';
import { TableColumn } from 'react-data-table-component';
import ActionColumn from './ActionColumn';


export const columns: TableColumn<StoreRepository>[] = [
  {
    id: 'code',
    name: 'Code',
    selector: (row) => row.code,
    cell(row, rowIndex, column, id) {
      return <div className="flex gap-4 items-center">
        <Typography.Text>{row.code}</Typography.Text>
      </div>
    },
  },
  {
    id: 'name',
    name: 'NAME',
    width: '35%',
    selector: (row) => row.name,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-center">
          <div className="w-28">
            <Image
              className="rounded-lg"
              src={process.env.REACT_APP_API_URL + row.images[0]}
            />
          </div>
          <div className="flex-1 items-center">
            <Typography.Text className="line-clamp-1 font-semibold">{row.name}</Typography.Text>
            <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: row.description }}></p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'address',
    name: 'ADDRESS',
    selector: (row) => row.address.province,
    cell: (row, index, column, id) => {
      return (
        <div className="flex-1 items-center">
          <p className="line-clamp-3">{row.address.specific}, {row.address.ward}, {row.address.district}, {row.address.province}</p>
        </div>
      );
    },
  },
  {
    id: 'creator',
    name: 'CREATOR',
    selector: (row) => row.creator._id,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Avatar style={{ backgroundColor: '#4184c8e0', verticalAlign: 'middle' }} size="large" gap={10}>
            {'DVT'}
          </Avatar>
          <Typography>{row.creator.firstName + ' ' + row.creator.lastName}</Typography>
        </div>
      );
    },
  },
  {
    id: 'actions',
    name: 'ACTIONS',
    selector: (row) => row._id,
    cell: (row, index, column, id) => {
      return <ActionColumn id={row._id} repository={row} />
    },
  },
];

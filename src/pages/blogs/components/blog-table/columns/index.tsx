import { StoreBlog } from '@/types/entities';
import { Avatar, Badge, Image, Typography } from 'antd';
import { TableColumn } from 'react-data-table-component';
import ActionColumn from './ActionColumn';


export const columns: TableColumn<StoreBlog>[] = [
  {
    id: 'image',
    name: 'Hình ảnh',
    selector: (row) => row.image,
    cell(row, rowIndex, column, id) {
      return <div className="flex gap-4 items-center">
        <div className="w-28">
          <Image
            className="rounded-lg"
            src={process.env.REACT_APP_API_URL + row.image}
          />
        </div>
      </div>
    },
  },
  {
    id: 'name',
    name: 'Nội dung',
    width: '35%',
    selector: (row) => row.title,
    cell: (row, index, column, id) => {
      return (
        <div className="flex gap-4 items-center">
          <div className="flex-1 items-center">
            <Typography.Text className="line-clamp-1 font-semibold">{row.title}</Typography.Text>
            <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: row.summary }} />
          </div>
        </div>
      );
    },
  },
  {
    id: 'author',
    name: 'Tác giả',
    selector: (row) => row.author._id,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Avatar style={{ backgroundColor: '#4184c8e0', verticalAlign: 'middle' }} size="large" gap={10}>
            {'DVT'}
          </Avatar>
          <Typography>{row.author.firstName + ' ' + row.author.lastName}</Typography>
        </div>
      );
    },
  },
  {
    id: 'mode',
    name: 'Trạng thái',
    selector: (row) => row.author._id,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Badge   color='magenta'   count={row.mode}></Badge>
        </div>
      );
    },
  },
  {
    id: 'author',
    name: 'Lượt xem',
    selector: (row) => row.author._id,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Typography>{row.views}</Typography>
        </div>
      );
    },
  },
  {
    id: 'actions',
    name: 'ACTIONS',
    selector: (row) => row._id,
    cell: (row, index, column, id) => {
      return <ActionColumn id={row._id} blog={row} />
    },
  },
];

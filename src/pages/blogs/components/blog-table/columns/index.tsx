import { StoreBlog } from '@/types/entities';
import { Avatar, Badge, Image, Typography } from 'antd';
import { TableColumn } from 'react-data-table-component';
import ActionColumn from './ActionColumn';
import { getFirstLetter, randomBgAvatar } from '@/utils';
import { EModeBlog } from '@/types/enums';
import { LiteralUnion } from 'antd/es/_util/type';


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
    width: '20%',
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
    width: '15%',
    selector: (row) => row.author._id,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>
          <Avatar style={{ backgroundColor: randomBgAvatar() }} size="large">
            {getFirstLetter(row.author.firstName + ' ' + row.author.lastName)}
          </Avatar>
          <Typography>{row.author.firstName + ' ' + row.author.lastName}</Typography>
        </div>
      );
    },
  },
  {
    id: 'author',
    name: 'Danh mục',
    selector: (row) => row.category._id,
    cell: (row, index, column, id) => {
      return (
        <div className='flex gap-4 items-center'>

          <Typography>{row.category.name}</Typography>
        </div>
      );
    },
  },
  {
    id: 'mode',
    name: 'Trạng thái',
    selector: (row) => row.author._id,
    cell: (row, index, column, id) => {
      const colorsMode: Record<EModeBlog, LiteralUnion<"blue" | "purple" | "cyan" | "green" | "magenta" | "pink" | "red" | "orange" | "yellow" | "volcano" | "geekblue" | "lime" | "gold">> = {
        [EModeBlog.Hidden]: 'blue',
        [EModeBlog.Pending]: 'geekblue',
        [EModeBlog.Private]: 'magenta',
        [EModeBlog.Public]: 'pink',
      }
      const titleMode: Record<EModeBlog, string> = {
        hidden: 'Ẩn',
        pending: 'Đang chờ',
        private: 'Nội bộ',
        "public": "Công khai"
      }
      return (
        <div className='flex gap-4 items-center'>
          <Badge color={colorsMode[row.mode]} count={titleMode[row.mode]}></Badge>
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

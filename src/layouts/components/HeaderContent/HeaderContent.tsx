import { Avatar, Card, Input } from 'antd';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineLightMode } from 'react-icons/md';
import { IoLanguageOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
import { getFirstLetter } from '@/utils';

const HeaderContent = () => {
  const { user, colorUser } = useAppSelector(selectAuth)
  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <BiSearch size={25} />
          <Input placeholder="Search" className="outline-none border-none" />
        </div>
        <div className="flex gap-4 items-center">
          <IoLanguageOutline size={25} className="text-slate-500 cursor-pointer" />
          <MdOutlineLightMode size={25} className="text-slate-500 cursor-pointer" />
          <BiCategory size={25} className="text-slate-500 cursor-pointer" />
          <FaBell size={25} className="text-slate-500 cursor-pointer" />
          <Avatar
            size={35}
            style={{ background: colorUser }}
            src={user?.avatar ? process.env.REACT_APP_API_URL + user.avatar : undefined}
          >{getFirstLetter(user?.firstName + ' ' + user?.lastName)}</Avatar>
        </div>
      </div>
    </Card>
  );
};

export default HeaderContent;

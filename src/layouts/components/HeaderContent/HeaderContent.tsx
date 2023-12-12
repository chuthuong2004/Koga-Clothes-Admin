import { Avatar, Card, Input } from 'antd';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineLightMode } from 'react-icons/md';
import { IoLanguageOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';

const HeaderContent = () => {
  return (
    <Card bordered={false} >
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <BiSearch size={25} />
          <Input placeholder="Search" className="outline-none border-none" />
        </div>
        <div className="flex gap-4 items-center">
          <IoLanguageOutline size={25} className='text-slate-500' />
          <MdOutlineLightMode size={25} className='text-slate-500' />
        <BiCategory size={25} className='text-slate-500' />
          <FaBell size={25} className='text-slate-500'/>
          <Avatar
            size={35}
            src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/images/avatars/avatar-1.png"
          />
        </div>
      </div>
    </Card>
  );
};

export default HeaderContent;

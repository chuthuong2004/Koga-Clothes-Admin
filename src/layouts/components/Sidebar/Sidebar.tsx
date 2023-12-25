import { NavLink } from 'react-router-dom';
import * as config from '@/config';
import { BsBarChart, BsChatSquare, BsPersonBadge, BsReceipt, BsTruck } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { MdLogout, MdOutlineCategory, MdOutlineReviews } from 'react-icons/md';
import { FaTrademark } from 'react-icons/fa';
import { useAppSelector } from '@/types/commons';
import { useAuth } from '@/hooks/services';
import { selectAuth } from '@/store/selectors';
import { cn } from '@/utils';
import { Typography } from 'antd';
import { IoSettingsOutline } from 'react-icons/io5';
const links = [
  {
    to: config.routes.dashboard,
    icon: <BsBarChart />,
    title: 'Dashboard',
  },
  {
    to: config.routes.order,
    icon: <BsReceipt />,
    title: 'Đơn hàng',
  },
  {
    to: config.routes.brand,
    icon: <FaTrademark />,
    title: 'Thương hiệu',
  },
  {
    to: config.routes.category,
    icon: <BiCategory />,
    title: 'Danh mục',
  },
  {
    to: config.routes.repository,
    icon: <BiCategory />,
    title: 'Kho lưu trữ',
  },
  {
    to: config.routes.product,
    icon: <BsTruck />,
    title: 'Sản phẩm',
  },

  {
    to: config.routes.customer,
    icon: <BsPersonBadge />,
    title: 'Khách hàng',
  },
  {
    to: config.routes.chat,
    icon: <BsChatSquare />,
    title: 'Tin nhắn',
  },
  {
    to: config.routes.review,
    icon: <MdOutlineReviews />,
    title: 'Đánh giá',
  },
  {
    to: config.routes.role,
    icon: <IoSettingsOutline />,
    title: 'Role',
  },
  {
    to: '#',
    icon: <MdLogout />,
    title: 'Đăng xuất',
  },
];

const Sidebar = () => {
  const { user } = useAppSelector(selectAuth);
  const { handleLogout: onLogout } = useAuth();
  const handleLogout = async (link: any) => {
    if (link.to === '#') {
      await onLogout();
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 z-10 w-[15vw] bg-card shadow-card px-4 py-8">
      <div className="flex flex-col w-full h-full mb-12">
        <div>
          <Typography.Title level={2}>Admin Koga</Typography.Title>
        </div>
        <div className=" overflow-y-scroll">
          <div className="flex flex-col gap-2">
            {links.map((link, i) => (
              <NavLink
                key={i}
                to={link.to}
                onClick={() => handleLogout(link)}
                className={(nav) =>
                  cn(
                    'flex gap-4 p-4 rounded-lg py-4 items-center',
                    nav.isActive && link.to !== '#' && 'bg-primary-gradient text-white',
                  )
                }
              >
                <div className="">{link.icon}</div>
                <Typography.Text className={cn('text-current')}>{link.title}</Typography.Text>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

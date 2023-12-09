import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import * as config from '@/config';
import { BsBarChart, BsChatSquare, BsPersonBadge, BsReceipt, BsTruck } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { MdLogout, MdOutlineCategory, MdOutlineReviews } from 'react-icons/md';
import { FaTrademark } from 'react-icons/fa';
import { useAppSelector } from '@/types/commons';
import { useAuth } from '@/hooks/services';
import { selectAuth } from '@/store/selectors';
const cx = classNames.bind(styles);
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
    to: '#',
    icon: <MdLogout />,
    title: 'Đăng xuất',
  },
];

const Sidebar = () => {
  const { user } = useAppSelector(selectAuth);
  const {handleLogout: onLogout} = useAuth()
  const handleLogout = async (link: any) => {
    if (link.to === '#') {
      await onLogout()
    }
  };
  return (
    <div className={cx('container', 'h-screen')}>
      <div className={cx('logo')}>Admin Koga</div>
      <div className={cx('menu')}>
        <div className={cx('menu__account')}>
          <img
            src={
              user?.avatar
                ? process.env.REACT_APP_API_URL + user.avatar
                : 'https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg'
            }
            className={cx('menu__account__img')}
            alt=""
          />
          <div className={cx('menu__account__info')}>
            <h3>{user?.firstName ? user.firstName + ' ' + user?.lastName : user?.username}</h3>
            <span>Quản lý bán hàng</span>
          </div>
        </div>
        <div className={cx('menu__links')}>
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              onClick={() => handleLogout(link)}
              className={(nav) =>
                cx('menu__links--item', { active: nav.isActive && link.to !== '#' })
              }
            >
              <span className={cx('icon')}>{link.icon}</span>
              <span>{link.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

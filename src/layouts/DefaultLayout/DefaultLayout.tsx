import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
// import ScrollToTop from '../components/ScrollToTop';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, ReactNode } from 'react';
import { useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
import HeaderContent from '../components/HeaderContent';
import Sidebar from '../components/Sidebar';
const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAppSelector(selectAuth);
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  useEffect(() => {
    const handleScrollTop = () => {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    handleScrollTop();
  }, [pathname, query]);
  useEffect(() => {
    // socket.emit(config.socketEvents.CLIENT.ADD_USER, user?._id);
  }, []);
  return (
    <div className={cx('container')}>
      {/* Header */}
      {/* <ScrollToTop /> */}
      {/* <Header /> */}
      {/* Container */}
      <div className={cx('sidebar')}>
        <Sidebar />
      </div>
      <div className={cx('right')}>
        <HeaderContent />
        <div className={cx('content')}> {children} </div>
        {/* 
        {pathname !== config.routes.chat && <FooterContent />} */}
      </div>
    </div>
  );
};
export default DefaultLayout;

import { useLocation } from 'react-router-dom';
import React, { useEffect, ReactNode } from 'react';
import HeaderContent from '../components/HeaderContent';
import Sidebar from '../components/Sidebar';
import { routes } from '@/config';
import { socketServices } from '@/services';
import { useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { motion } from 'framer-motion';
import { useToggle } from '@/hooks/utils';

type Props = {
  children: ReactNode;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector(selectAuth);
  const { pathname } = useLocation();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const isTablet = useMediaQuery('(max-width: 68rem)');
  const isMobile = useMediaQuery('(max-width: 450px)');
  const { isOpen, toggle, onClose } = useToggle(false);
  useEffect(() => {
    const handleScrollTop = () => {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    handleScrollTop();
  }, [pathname, query]);
  useEffect(() => {
    if (user?._id) {
      socketServices.emit('connection', { user_id: user._id });
    }
    socketServices.listen('emit-connection', ({ message }) => {
      console.log('OOOOOOKKKK: ', message);
    });
  }, [user?._id]);
  console.log('isTablet: ', isTablet);

  return (
    <div className="flex bg-background">
      <Sidebar openSidebar={isOpen} closeSidebar={onClose} />
      {isOpen && (
        <motion.div
          onClick={toggle}
          initial={{ opacity: 0 }}
          exit={{
            opacity: 0,
          }}
          animate={{ opacity: isTablet && isOpen ? 0.3 : 0 }}
          className={`fixed top-0 left-0 right-0 bottom-0 bg-[#636364] z-1`}
        />
      )}

      <motion.div
        animate
        className={`flex flex-col flex-1 ${
          isMobile ? 'mx-5' : isTablet ? 'mx-10' : 'mx-20'
        } mt-12 gap-12 transition-all ${!isTablet && 'ml-[calc(25rem+2rem)] mix-h-screen'}`}
      >
        <HeaderContent toggleSidebar={toggle} />
        <div className={`${pathname !== routes.chat && 'min-h-screen pb-60'} `}> {children} </div>
      </motion.div>
    </div>
  );
};
export default DefaultLayout;

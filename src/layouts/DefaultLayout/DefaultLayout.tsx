import { useLocation } from 'react-router-dom';
import React, { useEffect, ReactNode } from 'react';
import HeaderContent from '../components/HeaderContent';
import Sidebar from '../components/Sidebar';
import { routes } from '@/config';
import { socketServices } from '@/services';
import { useAppSelector } from '@/types/commons';
import { selectAuth } from '@/store/selectors';

type Props = {
  children: ReactNode;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector(selectAuth)
  const { pathname } = useLocation();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
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
      console.log("OOOOOOKKKK: ", message);

    })
  }, [user?._id]);
  return (
    <div className='flex bg-background'>
      <Sidebar />
      <div className='flex flex-col flex-1 mx-20 mt-12 ml-[calc(15vw+2rem)] gap-12'>
        <HeaderContent />
        <div className={`${pathname !== routes.chat && 'min-h-screen pb-60'} `} > {children} </div>
      </div>
    </div>
  );
};
export default DefaultLayout;

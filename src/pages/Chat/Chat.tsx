import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { ChatContent, ChatSidebar } from './components';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/types/commons';
import { selectChat } from '@/store/selectors';
import { toggleSidebar } from '@/store/actions';
import { useCallback } from 'react';

const Chat = () => {
  const dispatch = useAppDispatch()
  const { openSidebar } = useAppSelector(selectChat);
  const isTablet = useMediaQuery('(max-width: 48rem)');

  const handleToggleSidebar = useCallback(() => dispatch(toggleSidebar()), [dispatch])
  return (
    <div className="h-[75vh] w-full bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="flex relative w-ful h-full">
        <motion.div
          animate={{
            x: isTablet ? (openSidebar ? 0 : -200) : 0,
            animation: 'linear',
            // position:
            position: isTablet ? (openSidebar ? 'absolute' : 'absolute') : 'relative',

            scaleX: isTablet ? (openSidebar ? 1 : 0) : 1,
          }}
          transition={{ ease: 'linear', duration: 0.2 }}
          className={`opacity-100 flex-3 border-r ${openSidebar && 'bg-card top-0 left-0 bottom-0 z-2'
            }`}
        >
          <ChatSidebar />
        </motion.div>
        {openSidebar && (
          <motion.div
            onClick={handleToggleSidebar}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
            }}
            animate={{ opacity: isTablet && openSidebar ? 0.3 : 0 }}
            className={`absolute top-0 left-0 right-0 bottom-0 bg-[#636364] z-1`}
          />
        )}
        <motion.div
          animate={{
            animation: 'linear',
          }}
          className={isTablet ? 'flex-1' : 'flex-[7]'}
        >
          <ChatContent />
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;

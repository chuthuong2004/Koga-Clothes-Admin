import { useAuth } from '@/hooks/services';
import { NAVIGATION_VERTICAL } from '@/navigation';
import { cn } from '@/utils';
import { Collapse, Typography } from 'antd';
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom'; import { SlArrowDown } from "react-icons/sl";
import { Fragment } from 'react';

type SidebarProps = {
  openSidebar: boolean;
  closeSidebar: () => void;
};
const Sidebar = ({ openSidebar, closeSidebar }: SidebarProps) => {
  const isTablet = useMediaQuery('(max-width: 68rem)');
  const { handleLogout: onLogout } = useAuth();
  const handleLogout = async (link: any) => {
    isTablet && closeSidebar();
    if (link.to === '#') {
      await onLogout();
    }
  };
  return (
    <motion.div
      animate={{
        x: isTablet ? (openSidebar ? 0 : -250) : 0,
        opacity: isTablet ? (openSidebar ? 1 : 0) : 1,
        animation: 'linear',
      }}
      transition={{ ease: 'linear', duration: 0.2 }}
      // exit={{ x: -500 }}
      className="fixed top-0 bottom-0 left-0 z-10 w-[25rem] bg-card shadow-card px-4 py-8"
    >
      <div className="flex flex-col w-full h-full mb-12">
        <div>
          <Typography.Title level={2}>Admin Koga</Typography.Title>
        </div>
        <div className=" overflow-y-scroll">
          <div className="flex flex-col gap-2">
            {NAVIGATION_VERTICAL.map((link, i) => (
              <Fragment>
                <NavLink
                  key={i}
                  to={link.to} 
                  end
                  onClick={() => handleLogout(link)}
                  className={(nav) =>
                    cn(
                      'flex gap-4 p-4 rounded-lg py-4 items-center justify-between',
                      nav.isActive && link.to !== '#' && 'bg-primary-gradient text-white',
                    )
                  }
                >
                  <div className='flex items-center gap-4'>

                    <div className="">{link.icon}</div>
                    <Typography.Text className={cn('text-current')}>{link.title}</Typography.Text>
                  </div>
                  {link.children && <div>
                    <SlArrowDown />
                  </div>}
                </NavLink>
                {link.children && link.children.map(item => (
                  <NavLink
                    key={i}
                    to={item.to}
                    end
                    onClick={() => handleLogout(item)}
                    className={(nav) =>
                      cn(
                        'flex gap-4 p-4 rounded-lg py-4 items-center justify-between',
                        nav.isActive && item.to !== '#' && 'bg-primary-gradient text-white',
                      )
                    }
                  >
                    <div className='flex items-center gap-4'>

                      <div className="">{item.icon}</div>
                      <Typography.Text className={cn('text-current')}>{item.title}</Typography.Text>
                    </div>
                  </NavLink>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

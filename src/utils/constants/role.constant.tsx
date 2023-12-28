import { ERoleDefault } from '@/types/enums/role.enum';
import { ReactNode } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineComputer, MdSwitchAccount } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';

export const ROLE: Record<
  ERoleDefault,
  {
    icon?: ReactNode;
    value: ERoleDefault;
    color?: string;
    backgroundColor?: string;
  }
> = {
  Root: {
    value: ERoleDefault.Root,
    icon: <MdOutlineComputer className="text-primary" />,
    color: '#eb3d63 ',
    backgroundColor: '#fbe6e6 ',
  },
  BasicRoleUser: {
    value: ERoleDefault.BasicRoleUser,
    icon: <FaRegUser className="text-[#938af4]" />,
    color: '#938af4 ',
    backgroundColor: '#eae8fd ',
  },
  BasicRoleSubAdmin: {
    value: ERoleDefault.BasicRoleSubAdmin,
    icon: <GrUserAdmin className="text-[#938af4]" />,
    color: '#938af4 ',
    backgroundColor: '#eae8fd ',
  },
  Manager: {
    value: ERoleDefault.Manager,
    icon: <MdOutlineComputer className="text-primary" />,
    color: '#eb3d63 ',
    backgroundColor: '#fbe6e6 ',
  },
  Accountant: {
    value: ERoleDefault.Accountant,
    icon: <MdSwitchAccount className="text-[#4dcfe8]" />,
    color: '#4dcfe8',
    backgroundColor: '#dff7fb',
  },
  Staff: {
    value: ERoleDefault.Staff,
    icon: <MdSwitchAccount className="text-[#4dcfe8]" />,
    color: '#4dcfe8',
    backgroundColor: '#dff7fb',
  },
  Security: {
    value: ERoleDefault.Security,
    icon: <MdOutlineComputer className="text-primary" />,
    color: '#eb3d63',
    backgroundColor: '#fbe6e6',
  },
};

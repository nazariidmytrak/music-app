'use client';

import { FC, ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Box from '@/components/shared/box';
import SidebarItem from '@/components/sidebar/sidebarItem';
import Library from '@/components//library';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
        icon: HiHome,
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
        icon: BiSearch,
      },
    ],
    [pathname]
  );

  return (
    <div className='flex h-full'>
      <div className='hidden flex-col gap-y-2 p-2 h-full w-[300px] bg-black md:flex'>
        <Box>
          <div className='grid gap-y-4 px-5 py-4'>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library />
        </Box>
      </div>
      <main className='flex-1 h-full py-2 overflow-y-auto'>{children}</main>
    </div>
  );
};

export default Sidebar;

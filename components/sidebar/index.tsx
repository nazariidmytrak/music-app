'use client';

import { FC, ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

import Box from '@/components/shared/box';
import SidebarItem from '@/components/sidebar/sidebarItem';
import Library from '@/components//library';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';

interface Props {
  children: ReactNode;
  songs: Song[];
}

const Sidebar: FC<Props> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();
  const sidebarHeight = player.activeId ? 'calc(100% - 80px)' : '100%';

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
    <motion.div
      initial={{ opacity: 0, height: '100%' }}
      animate={{ opacity: 1, height: sidebarHeight }}
      exit={{ opacity: 0, height: '100%' }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className={`flex ${twMerge('transition-all')}`}
    >
      <div className='hidden flex-col gap-y-2 p-2 h-full w-[300px] bg-black md:flex'>
        <Box>
          <div className='grid gap-y-4 px-5 py-4'>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library songs={songs} />
        </Box>
      </div>
      <main className='flex-1 h-full py-2 overflow-y-auto'>{children}</main>
    </motion.div>
  );
};

export default Sidebar;

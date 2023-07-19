'use client';

import { FC } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface Props {
  icon: IconType;
  href: string;
  label: string;
  active?: boolean;
}

const SidebarItem: FC<Props> = ({
  icon: Icon,
  href,
  label,
  active,
}) => {
  return (
    <Link
      className={twMerge(
        'flex flex-row items-center h-auto w-full gap-x-4 py-1 cursor-pointer text-neutral-400 font-medium transition hover:text-white',
        active && 'text-white'
      )}
      href={href}
    >
      <Icon size={26} />
      <p className='w-full truncate'>{label}</p>
    </Link>
  );
};

export default SidebarItem;

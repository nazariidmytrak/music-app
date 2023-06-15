'use client';

import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/button';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const handleLogout = () => {
    // Handle logout logic
  };
  return (
    <div
      className={twMerge(
        'h-fit p-6 bg-gradient-to-b from-emerald-800',
        className
      )}
    >
      <div className='flex items-center justify-between mb-4 w-full '>
        <div className='hidden gap-x-2 items-center md:flex'>
          <button
            className='grid place-items-center bg-black rounded-full transition hover:opacity-75'
            onClick={() => router.back()}
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            className='grid place-items-center bg-black rounded-full transition hover:opacity-75'
            onClick={() => router.forward()}
          >
            <RxCaretRight className='text-white' size={35} />
          </button>
        </div>
        <div className='flex items-center gap-x-2 md:hidden'>
          <button className='grid place-items-center p-2 rounded-full bg-white transition hover:opacity-75'>
            <HiHome className='text-black' size={20} />
          </button>
          <button className='grid place-items-center p-2 rounded-full bg-white transition hover:opacity-75'>
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex items-center justify-between gap-x-4'>
          <>
            <div>
              <Button
                className='bg-transparent text-neutral-300 font-medium'
                onClick={() => {}}
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Button className='bg-white px-6 py-2' onClick={() => {}}>
                Log In
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;

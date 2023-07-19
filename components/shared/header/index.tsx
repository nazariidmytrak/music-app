'use client';

import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-hot-toast';

import Button from '@/components/shared/buttons/button';
import { useAuthModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';

interface Props {
  children: ReactNode;
  className?: string;
}

const Header: FC<Props> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  const handleBack = () => router.back();
  const handleForward = () => router.forward();

  const renderButtons = () => (
    <div className='flex gap-x-4 items-center'>
      <Button className='bg-white px-6 py-2' onClick={handleLogout}>
        Logout
      </Button>
      <Button className='bg-white' onClick={() => router.push('/account')}>
        <FaUserAlt />
      </Button>
    </div>
  );

  const renderAuthButtons = () => (
    <>
      <div>
        <Button
          className='bg-transparent text-neutral-300 font-medium'
          onClick={authModal.onOpen}
        >
          Sign Up
        </Button>
      </div>
      <div>
        <Button className='bg-white px-6 py-2' onClick={authModal.onOpen}>
          Log In
        </Button>
      </div>
    </>
  );

  return (
    <div
      className={twMerge(
        'h-fit p-6 bg-gradient-to-b from-emerald-800',
        className
      )}
    >
      <div className='flex items-center justify-between mb-4 w-full'>
        <div className='hidden gap-x-2 items-center md:flex'>
          <button
            className='grid place-items-center bg-black rounded-full transition hover:opacity-75'
            onClick={handleBack}
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            className='grid place-items-center bg-black rounded-full transition hover:opacity-75'
            onClick={handleForward}
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
          {user ? renderButtons() : renderAuthButtons()}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;

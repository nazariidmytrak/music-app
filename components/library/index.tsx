'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

const Library = () => {
  const onClick = () => {
    // Handle upload later
  };
  return (
    <div className='grid'>
      <div className='flex items-center justify-between px-5 pt-4 mb-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium'>Your Library</p>
        </div>
        <AiOutlinePlus
          className='cursor-pointer text-neutral-400 transition hover:text-white'
          onClick={onClick}
          size={20}
        />
      </div>
      <div className='grid gap-y-2 px-3'>List of songs!</div>
    </div>
  );
};

export default Library;

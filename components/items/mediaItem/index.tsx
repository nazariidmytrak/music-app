'use client';

import { FC } from 'react';
import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';

interface Props {
  onClick?: (id: string) => void;
  data: Song;
}

const MediaItem: FC<Props> = ({ onClick, data }) => {
  const imageUrl = useLoadImage(data);
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };
  return (
    <div
      className='w-full p-2 flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 rounded-md'
      onClick={handleClick}
    >
      <div className='relative overflow-hidden min-h-[48px] min-w-[48px] rounded-md'>
        <Image
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={imageUrl || '/images/liked.png'}
          fill
          alt='Image'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;

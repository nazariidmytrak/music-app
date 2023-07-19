'use client';

import { FC } from 'react';
import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';
import PlayButton from '@/components/shared/buttons/playButton';

interface Props {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: FC<Props> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  return (
    <div
      className='relative group flex flex-col items-center justify-center p-3 gap-x-4 overflow-hidden 
      rounded-md bg-neutral-400/5 cursor-pointer transition  hover:bg-neutral-400/10'
      onClick={() => onClick(data.id)}
    >
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <Image
          className='object-cover'
          src={imageUrl || '/images/liken.png'}
          fill
          alt='Image'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='w-full truncate font-semibold'>{data.title}</p>
        <p className='w-full pb-4 truncate text-neutral-400 text-sm '>
          By {data.author}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;

'use client';

import { FC } from 'react';

import { Song } from '@/types';
import MediaItem from '@/components/items/mediaItem';

interface Props {
  songs: Song[];
}

const SearchContent: FC<Props> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className='w-full px-6 flex flex-col gap-y-2 text-neutral-400'>
        No songs found
      </div>
    );
  }
  return (
    <div className='w-full px-6 flex flex-col gap-y-2'>
      {songs.map((song) => (
        <div key={song.id} className='w-full flex items-center gap-x-4'>
          <div className='flex-1'>
            <MediaItem onClick={() => {}} data={song} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;

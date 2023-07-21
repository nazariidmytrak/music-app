'use client';

import { FC } from 'react';

import { Song } from '@/types';
import MediaItem from '@/components/items/mediaItem';
import LikeButton from '@/components/shared/buttons/likeButton';
import EmptySongsMessage from '@/components/shared/emptySongs';
import useOnPlay from '@/hooks/useOnPlay';

interface Props {
  songs: Song[];
}

const SearchContent: FC<Props> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <EmptySongsMessage message='No songs found' />;
  }
  return (
    <div className='w-full px-6 flex flex-col gap-y-2'>
      {songs.map((song) => (
        <div key={song.id} className='w-full flex items-center gap-x-4'>
          <div className='flex-1'>
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;

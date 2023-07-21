'use client';

import { FC } from 'react';

import { Song } from '@/types';
import SongItem from '@/components/items/songItem';
import EmptySongsMessage from '@/components/shared/emptySongs';
import useOnPlay from '@/hooks/useOnPlay';

interface PageContentProps {
  songs: Song[];
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <EmptySongsMessage message='No songs found' />;
  }
  return (
    <div className='grid gap-4 mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          data={song}
        />
      ))}
    </div>
  );
};

export default PageContent;

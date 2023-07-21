'use client';

import { FC } from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

import MediaItem from '@/components/items/mediaItem';
import { useAuthModal, useUploadModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';

interface Props {
  songs: Song[];
}

const Library: FC<Props> = ({ songs }) => {
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);

  const onClick = () => (!user ? authModal.onOpen() : uploadModal.onOpen());

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
      <div className='grid gap-y-2 px-3'>
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            onClick={(id: string) => onPlay(id)}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;

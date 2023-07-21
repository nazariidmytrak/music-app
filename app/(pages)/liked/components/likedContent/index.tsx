'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Song } from '@/types';
import { useUser } from '@/hooks/useUser';
import { useAuthModal } from '@/hooks/useModal';
import useOnPlay from '@/hooks/useOnPlay';
import MediaItem from '@/components/items/mediaItem';
import LikeButton from '@/components/shared/buttons/likeButton';
import EmptySongsMessage from '@/components/shared/emptySongs';

interface Props {
  songs: Song[];
}

const LikedContent: FC<Props> = ({ songs }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      /*  router.replace('/'); */
      authModal.onOpen();
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return <EmptySongsMessage message='No liked songs' />;
  }

  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
      {songs.map((song) => (
        <div className='flex items-center gap-x-4 w-full' key={song.id}>
          <div className='flex-1'>
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;

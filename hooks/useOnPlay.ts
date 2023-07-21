import { useCallback } from 'react';

import { Song } from '@/types';
import { useAuthModal } from './useModal';
import usePlayer from './usePlayer';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = useCallback(
    (id: string) => {
      if (!user) {
        return authModal.onOpen();
      }

      player.setId(id);
      player.setIds(songs.map((song) => song.id));
    },
    [authModal, player, songs, user]
  );

  return onPlay;
};

export default useOnPlay;

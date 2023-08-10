'use client';

import { FC, useEffect, useState } from 'react';
import useSound from 'use-sound';

import { Song } from '@/types';
import MediaItem from '@/components/items/mediaItem';
import LikeButton from '@/components/shared/buttons/likeButton';
import PlayPauseButton from '@/components/shared/buttons/playPauseButton';
import VolumeControls from './volumeControls';
import PlayerControls from './playerControls';
import usePlayer from '@/hooks/usePlayer';
import useVolumeStore from '@/hooks/useVolume';
import { onPlayNextOrPrevious } from '@/helpers/playerHelpers';
import CloseButtonAnimation from '@/components/animations/closeButtonAnimation';

interface Props {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<Props> = ({ song, songUrl }) => {
  const volume = useVolumeStore((state) => state.volume);
  const setVolume = useVolumeStore((state) => state.setVolume);
  const [isPlaying, setIsPlaying] = useState(false);
  const player = usePlayer();

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    format: ['mp3'],
    volume: volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNextOrPrevious(player.ids, player.activeId, player.setId, 'next');
    },
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div className='grid grid-cols-2 h-full md:grid-cols-3'>
      <div className='flex justify-start w-full'>
        <div className='flex items-center gap-x-4'>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className='flex items-center justify-end w-full col-auto md:hidden'>
        <PlayPauseButton onClick={handlePlay} isPlaying={isPlaying} />
      </div>
      <div className='hidden h-full w-full justify-center items-center gap-x-6 max-w-[722px] md:flex'>
        <PlayerControls handlePlay={handlePlay} isPlaying={isPlaying} />
      </div>
      <div className='hidden justify-end pr-2 w-full md:flex'>
        <VolumeControls volume={volume} setVolume={setVolume} />
      </div>
      <button
        className='absolute top-0 right-0 font-bold '
        onClick={player.reset}
      >
        <CloseButtonAnimation />
      </button>
    </div>
  );
};

export default PlayerContent;

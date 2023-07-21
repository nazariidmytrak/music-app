'use client';

import { FC, useEffect, useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import useSound from 'use-sound';

import { Song } from '@/types';
import MediaItem from '@/components/items/mediaItem';
import LikeButton from '@/components/shared/buttons/likeButton';
import PlayPauseButton from '@/components/shared/buttons/playPauseButton';
import VolumeControls from './volumeControls';
import PlayerControls from './playerControls';
import usePlayer from '@/hooks/usePlayer';

interface Props {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<Props> = ({ song, songUrl }) => {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const player = usePlayer();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    format: ['mp3'],
    volume: volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
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
        <PlayPauseButton onClick={handlePlay} icon={Icon} />
      </div>
      <div className='hidden h-full w-full justify-center items-center gap-x-6 max-w-[722px] md:flex'>
        <PlayerControls
          handlePlay={handlePlay}
          icon={Icon}
          onPlayNext={onPlayNext}
          onPlayPrevious={onPlayPrevious}
          songUrl={songUrl}
        />
      </div>
      <div className='hidden justify-end pr-2 w-full md:flex'>
        <VolumeControls
          volumeIcon={VolumeIcon}
          volume={volume}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
};

export default PlayerContent;

'use client';

import { FC } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { IconType } from 'react-icons';

import PlayPauseButton from '@/components/shared/buttons/playPauseButton';

interface Props {
  handlePlay: () => void;
  icon: IconType;
  onPlayPrevious: () => void;
  onPlayNext: () => void;
  songUrl: string;
}

const PlayerControls: FC<Props> = ({
  handlePlay,
  icon: Icon,
  onPlayNext,
  onPlayPrevious,
  songUrl,
}) => {
  return (
    <>
      <AiFillStepBackward
        className='text-neutral-400 cursor-pointer transition hover:text-white'
        size={30}
        onClick={onPlayPrevious}
      />
      <PlayPauseButton onClick={handlePlay} icon={Icon} />
      <AiFillStepForward
        className='text-neutral-400 cursor-pointer transition hover:text-white'
        size={30}
        onClick={onPlayNext}
      />
    </>
  );
};

export default PlayerControls;

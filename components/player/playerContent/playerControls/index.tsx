'use client';

import { FC } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';

import { onPlayNextOrPrevious } from '@/helpers/playerHelpers';
import PlayPauseButton from '@/components/shared/buttons/playPauseButton';
import usePlayer from '@/hooks/usePlayer';

interface Props {
  handlePlay: () => void;
  isPlaying: boolean;
}

const PlayerControls: FC<Props> = ({ handlePlay, isPlaying }) => {
  const { ids, activeId, setId } = usePlayer();
  return (
    <>
      <AiFillStepBackward
        className='text-neutral-400 cursor-pointer transition hover:text-white'
        size={30}
        onClick={() => onPlayNextOrPrevious(ids, activeId, setId, 'previous')}
      />
      <PlayPauseButton onClick={handlePlay} isPlaying={isPlaying} />
      <AiFillStepForward
        className='text-neutral-400 cursor-pointer transition hover:text-white'
        size={30}
        onClick={() => onPlayNextOrPrevious(ids, activeId, setId, 'next')}
      />
    </>
  );
};

export default PlayerControls;

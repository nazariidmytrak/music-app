'use client';

import { FC } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { onPlayNextOrPrevious } from '@/helpers/playerHelpers';
import PlayPauseButton from '@/components/shared/buttons/playPauseButton';
import usePlayer from '@/hooks/usePlayer';

interface Props {
  handlePlay: () => void;
  icon: IconType;
}

const PlayerControls: FC<Props> = ({ handlePlay, icon: Icon }) => {
  const { ids, activeId, setId } = usePlayer();
  return (
    <>
      <AiFillStepBackward
        className='text-neutral-400 cursor-pointer transition hover:text-white'
        size={30}
        onClick={() => onPlayNextOrPrevious(ids, activeId, setId, 'previous')}
      />
      <PlayPauseButton onClick={handlePlay} icon={Icon} />
      <AiFillStepForward
        className='text-neutral-400 cursor-pointer transition hover:text-white'
        size={30}
        onClick={() => onPlayNextOrPrevious(ids, activeId, setId, 'next')}
      />
    </>
  );
};

export default PlayerControls;

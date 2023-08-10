'use client';

import { FC } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

interface Props {
  onClick: () => void;
  isPlaying: boolean;
}

const PlayPauseButton: FC<Props> = ({ onClick, isPlaying }) => {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  return (
    <div
      className='w-10 h-10 p-1 grid place-items-center rounded-full bg-white cursor-pointer'
      onClick={onClick}
    >
      <Icon size={30} color='black' />
    </div>
  );
};

export default PlayPauseButton;

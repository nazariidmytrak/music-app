'use client';

import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  onClick: () => void;
  icon: IconType;
}

const PlayPauseButton: FC<Props> = ({ onClick, icon: Icon }) => {
  return (
    <div
      className='w-10 h-10 p-1 grid place-items-center rounded-full bg-white cursor-pointer'
      onClick={onClick}
    >
      <Icon className='text-black' size={30} />
    </div>
  );
};

export default PlayPauseButton;

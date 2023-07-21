' use client';

import { FC } from 'react';
import { IconType } from 'react-icons';

import Slider from '../slider';

interface Props {
  volume: number;
  setVolume: (value: number) => void;
  volumeIcon: IconType;
}

const VolumeControls: FC<Props> = ({ volume, setVolume, volumeIcon: Icon }) => {
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  return (
    <div className='flex items-center gap-x-2 w-[120px]'>
      <Icon className='cursor-pointer' size={34} onClick={toggleMute} />
      <Slider value={volume} onChange={(value) => setVolume(value)} />
    </div>
  );
};

export default VolumeControls;

'use client';

import { FC, useState } from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import Slider from '../slider';

interface Props {
  volume: number;
  setVolume: (value: number) => void;
}

const VolumeControls: FC<Props> = ({ volume, setVolume }) => {
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const Icon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const toggleMute = () => {
    const newVolume = volume === 0 ? previousVolume : 0;
    setPreviousVolume(volume);
    setVolume(newVolume);
  };

  return (
    <div className='flex items-center gap-x-2 w-[120px] cursor-pointer'>
      <Icon size={34} onClick={toggleMute} />
      <Slider value={volume} onChange={(value) => setVolume(value)} />
    </div>
  );
};

export default VolumeControls;

'use client';

import { FC } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: FC<Props> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className='relative flex items-center w-full h-10 select-none touch-none'
      value={[value]}
      defaultValue={[1]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label='Volume'
    >
      <RadixSlider.Track className='relative h-[3px] grow bg-neutral-600 rounded-full'>
        <RadixSlider.Range className='absolute h-full bg-white rounded-full' />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;

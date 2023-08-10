'use client';

import { FC } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: FC<Props> = ({ value = 1, onChange }) => {
  const motionValue = useMotionValue(value);
  const rangeAnimation = useTransform(motionValue, [0, 1], ['100%', '0%']);
  const sliderRight = value === 0 ? '100%' : rangeAnimation;

  /*  const variants = {
    muted: { right: '100%' },
    unmuted: { right: `${(1 - value) * 100}%` },
  }; */

  const handleChange = (newValue: number[]) => {
    motionValue.set(newValue[0]);
    onChange?.(newValue[0]);
    };

  return (
    <RadixSlider.Root
      className='relative flex items-center w-full h-10 select-none touch-none'
      value={[value]}
      defaultValue={[1]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label='Volume'
    >
      <RadixSlider.Track className='relative h-[3px] grow bg-neutral-600 rounded-full'>
        {/*   <motion.span
          data-orientation='horizontal'
          animate={value === 0 ? 'muted' : 'unmuted'}
          variants={variants}
          className='h-full bg-white rounded-full absolute top-0 bottom-0 left-0'
        /> */}
        <motion.span
          data-orientation='horizontal'
          style={{
            right: sliderRight,
          }}
          className='h-full bg-white rounded-full absolute top-0 bottom-0 left-0'
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;

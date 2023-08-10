'use client';

import { motion } from 'framer-motion';

import { draw } from '@/helpers/animationHelpers';

const CloseButtonAnimation = () => {
  return (
    <motion.svg
      width='40'
      height='20'
      viewBox='0 0 600 250'
      initial='hidden'
      animate='visible'
    >
      <motion.line
        x1='220'
        y1='30'
        x2='360'
        y2='170'
        stroke='white'
        strokeWidth='20'
        variants={draw}
        custom={2}
      />
      <motion.line
        x1='220'
        y1='170'
        x2='360'
        y2='30'
        stroke='white'
        strokeWidth='20'
        variants={draw}
        custom={2.5}
      />
    </motion.svg>
  );
};

export default CloseButtonAnimation;

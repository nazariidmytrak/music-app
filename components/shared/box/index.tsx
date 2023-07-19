'use client';

import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: ReactNode;
  className?: string;
}

const Box: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge('w-full h-fit bg-neutral-900 rounded-lg', className)}
    >
      {children}
    </div>
  );
};

export default Box;

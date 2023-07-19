'use client';

import { FaPlay } from 'react-icons/fa';

const PlayButton = () => {
  return (
    <button
      className='p-4 transition duration-300 opacity-0 rounded-full bg-green-500 drop-shadow-md
    translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
    >
      <FaPlay className='text-black' />
    </button>
  );
};

export default PlayButton;

'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  name: string;
  href: string;
  image: string;
}

const ListItem: FC<ListItemProps> = ({ name, href, image }) => {
  const router = useRouter();

  const onClick = () => {
    // Add authentication before push
    router.push(href);
  };
  return (
    <button
      className='flex items-center gap-x-4 pr-4 relative group overflow-hidden transition rounded-md bg-neutral-100/10 hover:bg-neutral-100/20'
      onClick={onClick}
    >
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image className='object-cover' fill src={image} alt='Image' />
      </div>
      <p className='py-5 font-medium truncate'>{name}</p>
      <div className='grid place-items-center p-4 right-5 absolute transition opacity-0 rounded-full bg-green-500 drop-shadow-md group-hover:opacity-100 hover:scale-110'>
        <FaPlay className='text-black' />
      </div>
    </button>
  );
};

export default ListItem;

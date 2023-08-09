import Image from 'next/image';

import getLikedSongs from '@/actions/getLikedSongs';
import Header from '@/components/shared/header';
import LikedContent from './components/likedContent';

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div className='w-full h-full overflow-hidden overflow-y-auto bg-neutral-900 rounded-lg'>
      <Header>
        <div className='mt-20'>
          <div className='flex flex-col items-center gap-x-5 md:flex-row'>
            <div className='relative h-32 w-32 lg:h-44 lg:w-44'>
              <Image
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                fill
                src='/images/liked.png'
                alt='Playlist'
              />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
              <p className='hidden font-semibold text-sm md:block'>Playlist</p>
              <h2 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>
                Liked songs
              </h2>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;

import Header from '@/components/shared/header';
import ListItem from '@/components/items/listItem';
import PageContent from '@/app/(pages)/components/pageContent';
import getSongs from '@/actions/getSongs';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className='w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>Welcome back!</h1>
          <div className='grid gap-3 mt-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            <ListItem
              image='/images/liked.png'
              name='Liked Songs'
              href='liked'
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-white text-2xl font-semibold'>Newest songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}

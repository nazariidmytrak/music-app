import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/shared/header';
import SearchInput from '@/components/shared/inputs/searchInput';
import SearchContent from './components/searchContent';

interface Props {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: Props) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div className='w-full h-full overflow-hidden overflow-y-auto bg-neutral-900 rounded-lg '>
      <Header className='from-bg-neutral-900'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-white text-3xl font-semibold'>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;

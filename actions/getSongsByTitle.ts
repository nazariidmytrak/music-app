import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';
import getSongs from '@/actions/getSongs';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  try {
    const { data } = await supabase
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
      .order('created_at', { ascending: false });

    return data || [];
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};

export default getSongsByTitle;

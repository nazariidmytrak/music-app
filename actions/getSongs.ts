import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    const { data } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });

    return data || [];
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};

export default getSongs;

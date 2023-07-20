import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data } = await supabase
      .from('liked_songs')
      .select('*, songs(*)')
      .eq('user_id', session?.user?.id)
      .order('created_at', { ascending: false });

    return (
      data?.map((item) => ({
        ...item.songs,
      })) || []
    );
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};

export default getLikedSongs;
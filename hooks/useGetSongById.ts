import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';

import { Song } from '@/types';
import { toast } from 'react-hot-toast';

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  const fetchSong = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setSong(data as Song);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }, [id, supabaseClient]);

  useEffect(() => {
    if (id) {
      fetchSong();
    }
    return () => {
      setIsLoading(false);
    };
  }, [id, fetchSong]);

  return useMemo(() => ({ song, isLoading }), [isLoading, song]);
};

export default useGetSongById;

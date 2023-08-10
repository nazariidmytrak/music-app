import { Dispatch, SetStateAction } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { ModalStore } from '@/hooks/useModal';

export const fetchData = async (
  supabaseClient: SupabaseClient,
  user: User | null,
  songId: string
) => {
  if (!user || !user.id) {
    return false;
  }

  const { data, error } = await supabaseClient
    .from('liked_songs')
    .select('*')
    .eq('user_id', user.id)
    .eq('song_id', songId)
    .maybeSingle();

  if (!error && data) {
    return true;
  }

  return false;
};

export const handleLike = async (
  supabaseClient: SupabaseClient,
  user: User | null,
  songId: string,
  isLiked: boolean,
  setIsLiked: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance,
  authModal: ModalStore
) => {
  if (!user) {
    return authModal.onOpen();
  }

  const likeAction = isLiked ? 'delete' : 'insert';

  setIsLiked((prevIsLiked: boolean) => !prevIsLiked);

  try {
    const request =
      likeAction === 'delete'
        ? supabaseClient
            .from('liked_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId)
        : supabaseClient
            .from('liked_songs')
            .insert([{ song_id: songId, user_id: user.id }]);

    await request.then((result) => result.data);
    if (likeAction === 'insert') {
      toast.success(`Liked!`);
    }
    router.refresh();
  } catch (error: any) {
    setIsLiked((prevIsLiked: boolean) => !prevIsLiked);
    toast.error(`Error: ${error.message}`);
  }
};

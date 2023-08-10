'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';

import { useAuthModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { fetchData, handleLike } from './api';

interface Props {
  songId: string;
}

const LikeButton: FC<Props> = ({ songId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  useEffect(() => {
    fetchData(supabaseClient, user, songId).then((isLiked) =>
      setIsLiked(isLiked)
    );
  }, [songId, supabaseClient, user?.id]);

  const handleClick = () => {
    handleLike(
      supabaseClient,
      user,
      songId,
      isLiked,
      setIsLiked,
      router,
      authModal
    );
  };

  return (
    <button className='hover:opacity-75 transition' onClick={handleClick}>
      <UseAnimations
        reverse={isLiked}
        animation={heart}
        strokeColor='#22c55e'
        fillColor='#22c55e'
        size={25}
      />
    </button>
  );
};

export default LikeButton;

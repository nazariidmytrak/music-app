'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

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

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button className='hover:opacity-75 transition' onClick={handleClick}>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;

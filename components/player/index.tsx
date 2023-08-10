'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './playerContent';
import { motion, AnimatePresence } from 'framer-motion';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  return (
    <AnimatePresence>
      {song && songUrl && player.activeId && (
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(100%)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
          exit={{ opacity: 0, transform: 'translateY(100%)' }}
          transition={{
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className='w-full h-[80px] py-2 px-4 fixed bottom-0 bg-black'
        >
          <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Player;

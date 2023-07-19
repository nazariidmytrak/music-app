import { Song } from '@/types';

export function checkSongsList(songs: Song[]) {
  if (songs.length === 0) {
    return 'No songs found';
  } else {
    return null;
  }
}

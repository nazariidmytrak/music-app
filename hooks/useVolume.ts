import { create } from 'zustand';

interface VolumeStore {
  volume: number;
  setVolume: (newVolume: number) => void;
}

const useVolumeStore = create<VolumeStore>((set) => ({
  volume: 0.5,
  setVolume: (newVolume: number) => set({ volume: newVolume }),
}));

export default useVolumeStore;

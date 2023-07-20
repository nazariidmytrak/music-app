import { create } from 'zustand';

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const createModalHook = (initialState: Partial<ModalStore>) =>
  create<ModalStore>((set) => ({
    isOpen: initialState.isOpen || false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

const useAuthModal = createModalHook({ isOpen: false });
const useUploadModal = createModalHook({ isOpen: false });

export { useAuthModal, useUploadModal };

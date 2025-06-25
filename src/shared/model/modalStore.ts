import { type ReactNode } from 'react';
import { create } from 'zustand';

interface ModalContent {
  title?: string;
  content: ReactNode;
  closable?: boolean;
}

interface ModalState {
  isOpen: boolean;
  data: ModalContent | null;
  openModal: (data: ModalContent) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}));

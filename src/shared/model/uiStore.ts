import { create } from 'zustand';

interface UiStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  loading: true,
  setLoading: (value) => set({ loading: value }),
}));

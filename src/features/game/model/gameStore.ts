import { create } from 'zustand';
import { useItemStore } from './itemStore';
import { useBackpackStore } from './backpackStore';
import { useGameProgressStore } from './useGameProgressStore';

interface GameState {
  isGameStarted: boolean;
  score: number;
  coins: number;
  lives: number;
  isGameOver: boolean;
  isPaused: boolean;
  wasNavigatedToRules: boolean;

  setGameOver: (v: boolean) => void;
  setWasNavigatedToRules: (v: boolean) => void;
  startGame: () => void;
  stopGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  addScore: () => void;
  addCoin: () => void;
  loseLife: () => void;
  resetLives: () => void;
  resetScore: () => void;
  resetGame: () => void;
}

export const useGameStateStore = create<GameState>((set) => ({
  isGameStarted: false,
  score: 0,
  coins: 0,
  lives: 3,
  isGameOver: false,
  isPaused: false,
  wasNavigatedToRules: false,
  setWasNavigatedToRules: (v: boolean) => set({ wasNavigatedToRules: v }),
  setGameOver: (v) => set({ isGameOver: v }),
  startGame: () => set({ isGameStarted: true }),
  stopGame: () => set({ isGameStarted: false }),
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  addScore: () => set((s) => ({ score: s.score + 1 })),
  addCoin: () => set((s) => ({ coins: s.coins + 1 })),
  loseLife: () => set((s) => ({ lives: Math.max(0, s.lives - 1) })),
  resetScore: () => set({ score: 0 }),
  resetLives: () => set({ lives: 3 }),
  resetGame: () => {
    useItemStore.getState().reset();
    useBackpackStore.getState().reset();
    useGameProgressStore.getState().resetSession();
    sessionStorage.removeItem('cameFromRules');

    set(() => ({
      score: 0,
      coins: 0,
      lives: 3,
      isGameOver: false,
      isGameStarted: false,
      isPaused: false,
      wasNavigatedToRules: false,
    }));
  },
}));

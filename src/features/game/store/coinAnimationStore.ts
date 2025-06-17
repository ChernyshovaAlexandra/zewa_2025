import { create } from 'zustand';

interface FlyingCoin {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

interface CoinAnimationState {
  flyingCoins: FlyingCoin[];
  launchCoin: (from: { x: number; y: number }, to: { x: number; y: number }) => void;
  removeCoin: (id: string) => void;
}

export const useCoinAnimationStore = create<CoinAnimationState>((set) => ({
  flyingCoins: [],
  launchCoin: (from, to) =>
    set((s) => {
      const already = s.flyingCoins.some((c) => c.from.x === from.x && c.from.y === from.y);
      return already
        ? s
        : { flyingCoins: [...s.flyingCoins, { id: crypto.randomUUID(), from, to }] };
    }),
  removeCoin: (id) =>
    set((s) => ({
      flyingCoins: s.flyingCoins.filter((c) => c.id !== id),
    })),
}));

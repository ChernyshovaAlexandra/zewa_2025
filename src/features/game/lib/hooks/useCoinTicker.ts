import { useTick } from '@pixi/react';
import { useCoinAnimationStore } from '@/features/game/model/coinAnimationStore';

export const useCoinTicker = () => {
  const coins = useCoinAnimationStore((s) => s.flyingCoins);
  const update = useCoinAnimationStore((s) => s.updateCoins); 

  useTick((delta) => {
    if (!coins.length) return;
    const dtMs = delta * (1000 / 60);
    update(dtMs);
  });
};

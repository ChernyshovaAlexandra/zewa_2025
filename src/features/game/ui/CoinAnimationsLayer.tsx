import { useCoinAnimationStore } from '@/features/game/model/coinAnimationStore';
import { AnimatedFlyingCoin } from './AnimatedFlyingCoin';

export const CoinAnimationsLayer = () => {
  const coins = useCoinAnimationStore((s) => s.flyingCoins);
  const remove = useCoinAnimationStore((s) => s.removeCoin);

  return (
    <>
      {coins.map((coin) => (
        <AnimatedFlyingCoin
          key={coin.id}
          id={coin.id}
          from={coin.from}
          to={coin.to}
          onComplete={() => remove(coin.id)}
        />
      ))}
    </>
  );
};

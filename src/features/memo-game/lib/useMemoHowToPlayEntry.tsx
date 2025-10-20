import { useEffect } from 'react';
import { useMemoGameProgressStore } from '../model/memoGameProgressStore';
import { renderMemoHowToPlayModal } from './renderHowToPlayModal';

export function useMemoHowToPlayEntry() {
  const hasHydrated = useMemoGameProgressStore((s) => s.hasHydrated);
  const hasSeenHowToPlay = useMemoGameProgressStore((s) => s.hasSeenHowToPlay);
  const resetHowToPlay = useMemoGameProgressStore((s) => s.resetHowToPlay);

  useEffect(() => {
    resetHowToPlay();
  }, [resetHowToPlay]);

  useEffect(() => {
    if (!hasHydrated || hasSeenHowToPlay) {
      return;
    }
    renderMemoHowToPlayModal();
  }, [hasHydrated, hasSeenHowToPlay]);
}

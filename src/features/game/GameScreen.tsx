import { useEffect } from 'react';
import { renderGameOverModal, renderPauseModal, useHowToPlayEntry } from './lib';
import { useGameStateStore } from './store/gameStore';
import { BackpackControls, GameUIOverlay, GameCanvas, OnboardingOverlay } from './components';
import { useNavigate } from 'react-router-dom';

export function GameScreen() {
  const isGameOver = useGameStateStore((s) => s.isGameOver);
  const score = useGameStateStore((s) => s.score);
  const navigate = useNavigate();

  useHowToPlayEntry();

  useEffect(() => {
    const { isPaused, wasNavigatedToRules, setWasNavigatedToRules } = useGameStateStore.getState();
    if (isPaused && wasNavigatedToRules) {
      renderPauseModal(navigate);
      setWasNavigatedToRules(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isGameOver) return;
    renderGameOverModal(score, navigate);
  }, [isGameOver, score, navigate]);

  return (
    <>
      <GameCanvas />
      <GameUIOverlay />
      <BackpackControls />
      <OnboardingOverlay /> 
    </>
  );
}

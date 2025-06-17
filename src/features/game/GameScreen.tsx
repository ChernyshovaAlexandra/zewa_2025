import { useEffect } from 'react';
import { renderPauseModal, scheduleGameOverModal, useHowToPlayEntry } from './lib';
import { useGameModelStore } from './model/gameModelStore';
import { BackpackControls, GameUIOverlay, GameCanvas, OnboardingOverlay } from './ui';
import { useNavigate } from 'react-router-dom';

export function GameScreen() {
  const isGameOver = useGameModelStore((s) => s.isGameOver);
  const score = useGameModelStore((s) => s.score);
  const navigate = useNavigate();

  useHowToPlayEntry();

  useEffect(() => {
    const { isPaused, wasNavigatedToRules, setWasNavigatedToRules } = useGameModelStore.getState();
    if (isPaused && wasNavigatedToRules) {
      renderPauseModal(navigate);
      setWasNavigatedToRules(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isGameOver) return;
    const id = scheduleGameOverModal(score, navigate);
    return () => clearTimeout(id);
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

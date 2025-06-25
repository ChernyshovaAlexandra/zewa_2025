import { useEffect } from 'react';
import { renderGameOverModal, renderPauseModal, useHowToPlayEntry } from './lib';
import { useGameModelStore } from './model/gameModelStore';
import { BackpackControls, GameUIOverlay, GameCanvas, OnboardingOverlay } from './ui';
import { useModalStore } from '@/shared/model/modalStore';
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
    return () => {
      useModalStore.getState().closeModal();
    };
  }, []);

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

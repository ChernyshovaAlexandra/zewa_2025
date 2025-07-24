import { useEffect } from 'react';
import {  renderPauseModal, useHowToPlayEntry } from './lib';
import { useGameModelStore } from './model/gameModelStore';
import { BackpackControls, GameUIOverlay, GameCanvas, OnboardingOverlay } from './ui';
import { useModalStore } from '@/shared/model/modalStore';
import { useNavigate } from 'react-router-dom';
import { useHandleGameOver } from './lib/hooks/useHandleGameOver';

export function GameScreen() {
  const navigate = useNavigate();

  useHowToPlayEntry();
  useHandleGameOver(navigate);

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

  return (
    <>
      <GameCanvas />
      <GameUIOverlay />
      <BackpackControls />
      <OnboardingOverlay />
    </>
  );
}

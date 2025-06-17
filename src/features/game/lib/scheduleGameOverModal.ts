import type { NavigateFunction } from 'react-router-dom';
import { renderGameOverModal } from './renderGameOverModal';
import { GAME_OVER_DELAY_MS } from '../constants/gameSettings';

export const scheduleGameOverModal = (
  score: number,
  navigate: NavigateFunction,
): number => {
  return setTimeout(() => renderGameOverModal(score, navigate), GAME_OVER_DELAY_MS);
};

import styled from 'styled-components';
import { useOnboardingStore } from '@/features/game/model/onboardingStore';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { Screen1 } from './onboardingScreens/Screen1';
import { Screen2 } from './onboardingScreens/Screen2';
import { Screen3 } from './onboardingScreens/Screen3';
import { Screen4 } from './onboardingScreens/Screen4';

export const OnboardingOverlay = () => {
  const { step, isVisible, next, skip } = useOnboardingStore();
  const startGame = useGameModelStore((s) => s.startGame);

  const steps = [<Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />];

  if (!isVisible || step >= steps.length) return null;

  return (
    <Overlay
      onClick={
        step === steps.length - 1
          ? () => {
              skip();
              startGame();
            }
          : next
      }
    >
      {steps[step]}
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  z-index: 20;
  inset: 0;
  background: var(--modal-bg, rgba(0, 0, 0, 0.65));
  display: flex;
  justify-content: center;
  align-items: center;
`;

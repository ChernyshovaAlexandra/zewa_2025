import styled from 'styled-components';
import { useOnboardingStore } from '../store/onboardingStore';
import { Screen1 } from './onboardingScreens/Screen1';
import { Screen2 } from './onboardingScreens/Screen2';
import { Screen3 } from './onboardingScreens/Screen3';
import { Screen4 } from './onboardingScreens/Screen4';

export const OnboardingOverlay = () => {
  const { step, isVisible, next, skip } = useOnboardingStore();

  const steps = [<Screen1 />, <Screen2 />, <Screen3 />, <Screen4 />];

  if (!isVisible || step >= steps.length) return null;

  return <Overlay onClick={step === steps.length - 1 ? skip : next}>{steps[step]}</Overlay>;
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

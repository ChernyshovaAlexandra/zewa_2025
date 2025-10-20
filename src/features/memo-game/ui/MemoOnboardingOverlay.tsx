import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Heading, Text, ZewaButton } from '@/shared/ui';
import { useMemoGameProgressStore } from '../model/memoGameProgressStore';

export function MemoOnboardingOverlay() {
  const isVisible = useMemoGameProgressStore((s) => s.isOnboardingVisible);
  const finishOnboarding = useMemoGameProgressStore((s) => s.finishOnboarding);

  if (!isVisible) return null;

  const container = typeof document !== 'undefined' ? document.body : null;
  if (!container) return null;

  return createPortal(
    <Overlay>
      <Card>
        <Heading size="h3" align="center">
          Обучение «Мемо»
        </Heading>
        <Text align="center" size="p4" color="#596471">
          Здесь появится пошаговое обучение игре. Пока что достаточно знать, что нужно находить
          пары карточек. Полная версия скоро будет доступна.
        </Text>
        <ZewaButton variant="blue-b" onClick={finishOnboarding}>
          Понятно
        </ZewaButton>
      </Card>
    </Overlay>,
    container,
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.65);
  padding: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(420px, 100%);
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0px 12px 40px rgba(31, 37, 50, 0.18);
`;

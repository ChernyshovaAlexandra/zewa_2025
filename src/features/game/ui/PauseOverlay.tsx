import styled from 'styled-components';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton, Heading } from '@/shared/ui';

export const PauseOverlay = () => {
  const isPaused = useGameModelStore((s) => s.isPaused);
  const resumeGame = useGameModelStore((s) => s.resumeGame);
  const isModalOpen = useModalStore((s) => s.isOpen);

  if (!isPaused || isModalOpen) return null;

  return (
    <Overlay>
      <Inner>
        <Heading size="h2">Пауза</Heading>
        <ZewaButton variant="blue-b" onClick={resumeGame}>
          Продолжить
        </ZewaButton>
      </Inner>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: var(--modal-bg, rgba(0, 0, 0, 0.65));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

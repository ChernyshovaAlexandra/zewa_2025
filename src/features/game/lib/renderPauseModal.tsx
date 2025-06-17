import { useGameStateStore } from '@/features/game/model/gameStore';
import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import type { useNavigate } from 'react-router-dom';

export const renderPauseModal = (navigate: ReturnType<typeof useNavigate>) => {
  const { pauseGame, resumeGame } = useGameStateStore.getState();
  const { openModal, closeModal } = useModalStore.getState();

  pauseGame();

  openModal({
    title: 'Пауза',
    closable: false,
    content: (
      <Flex vertical gap="16px" align="center">
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            resumeGame();
            closeModal();
          }}
        >
          Продолжить
        </ZewaButton>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            useGameStateStore.getState().pauseGame();
            useGameStateStore.getState().setWasNavigatedToRules(true);
            navigate('/game/rules');
          }}
        >
          Правила игры
        </ZewaButton>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            useGameStateStore.getState().resetGame();
            navigate('/');
          }}
        >
          Выйти из игры
        </ZewaButton>
      </Flex>
    ),
  });
};

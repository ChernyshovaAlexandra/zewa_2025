import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import type { useNavigate } from 'react-router-dom';

export const renderPauseModal = (navigate: ReturnType<typeof useNavigate>) => {
  const { openModal, closeModal } = useModalStore.getState();

  useGameModelStore.getState().pauseGame();

  openModal({
    title: 'Пауза',
    closable: false,
    content: (
      <Flex vertical gap="16px" align="center">
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            useGameModelStore.getState().resumeGame();
            closeModal();
          }}
        >
          Продолжить
        </ZewaButton>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            useGameModelStore.getState().pauseGame();
            useGameModelStore.getState().setWasNavigatedToRules(true);
            navigate('/game/rules');
          }}
        >
          Правила игры
        </ZewaButton>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            useGameModelStore.getState().resetGame();
            navigate('/');
          }}
        >
          Выйти из игры
        </ZewaButton>
      </Flex>
    ),
  });
};

import { game_id, useGameModelStore } from '@/features/game/model/gameModelStore';
import { apiService } from '@/services';
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
          onClick={async () => {
            const { score, coins } = useGameModelStore.getState();
            if (score !== 0 || coins !== 0) {
              try {
                if (score !== 0 || coins !== 0) {
                  await apiService.gameResult({
                    game: game_id,
                    result: 0,
                    points: score,
                    coins,
                  });
                }
              } catch (e) {
                console.error('gameResult error', e);
              }
            }
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

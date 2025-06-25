import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton, Text } from '@/shared/ui';
import { Flex } from 'antd';
import { useGameProgressStore } from '@/features/game/model/useGameProgressStore';
import { useOnboardingStore } from '@/features/game/model/onboardingStore';
import { useGameModelStore } from '@/features/game/model/gameModelStore';

export const renderHowToPlayModal = () => {
  const { setHasPlayedEver, setHasPlayedSession } = useGameProgressStore.getState();
  const { start: startOnboarding } = useOnboardingStore.getState();
  const startGame = useGameModelStore.getState().startGame;
  const { openModal, closeModal } = useModalStore.getState();

  const handleStart = () => {
    setHasPlayedEver(true);
    setHasPlayedSession(true);
    closeModal();

    // 🔜 В будущем: запуск онбординга
    startOnboarding();
  };

  const handleSkip = () => {
    setHasPlayedEver(true);
    setHasPlayedSession(true);
    startGame();
    closeModal();
  };

  openModal({
    title: 'Как играть?',
    closable: false,
    content: (
      <Flex vertical gap="20px">
        <Text size="p4" align="center" color="#596471">
          Добро пожаловать! Сейчас подробнее расскажем, как играть.
        </Text>
        <Flex vertical gap="10px">
          <ZewaButton variant="blue-b" onClick={handleStart}>
            Начать
          </ZewaButton>
          <ZewaButton variant="blue-b" onClick={handleSkip}>
            Пропустить
          </ZewaButton>
        </Flex>
      </Flex>
    ),
  });
};

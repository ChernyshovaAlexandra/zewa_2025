import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton, Text } from '@/shared/ui';
import { Flex } from 'antd';
import { useGameProgressStore } from '@/features/game/model/useGameProgressStore';
import { useOnboardingStore } from '@/features/game/model/onboardingStore';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { applyNbsp } from '@/utils';

export const renderHowToPlayModal = async (game_coins: number) => {
  const { setHasPlayedEver, setHasPlayedSession } = useGameProgressStore.getState();
  const { start: startOnboarding } = useOnboardingStore.getState();
  const startGame = useGameModelStore.getState().startGame;
  const { openModal, closeModal } = useModalStore.getState();

  const ModalContent = () => {
    const handleStart = () => {
      setHasPlayedEver(true);
      setHasPlayedSession(true);
      closeModal();
      startOnboarding();
    };

    const handleSkip = () => {
      setHasPlayedEver(true);
      setHasPlayedSession(true);
      startGame();
      closeModal();
    };

    return (
      <Flex vertical gap="20px">
        <Text size="p4" align="center" color="#596471">
          {applyNbsp('Добро пожаловать!')}
          <br />
          {game_coins && (
            <>
              {applyNbsp(`Вам доступно ${game_coins} монет за загрузку чека.`)}
              <br />
            </>
          )}
          {applyNbsp('Сейчас подробнее расскажем, как играть.')}
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
    );
  };

  openModal({
    title: 'Как играть?',
    closable: false,
    content: <ModalContent />,
  });
};

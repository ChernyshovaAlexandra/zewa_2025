import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton, Text } from '@/shared/ui';
import { Flex } from 'antd';
import { useGameProgressStore } from '@/features/back-to-school-game/model/useGameProgressStore';
import { useOnboardingStore } from '@/features/back-to-school-game/model/onboardingStore';
import { useGameModelStore } from '@/features/back-to-school-game/model/gameModelStore';
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
        <Text
          style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}
          size="p4"
          align="center"
          color="#596471"
        >
          {applyNbsp(`Добро пожаловать!
          Сейчас расскажем подробнее, как играть. Если вы используете VPN, рекомендуем отключить его на время игры.`)}
          {game_coins ? (
            <>
              <br />
              {applyNbsp(`Вам доступны монеты в игре:`)}
              <Flex justify="center" gap={'5px'}>
                <p>+{game_coins} </p>
                <img
                  width="22px"
                  height="22px"
                  src="./assets/images/items/coin3.png"
                  alt="иконка монета"
                />
              </Flex>
            </>
          ) : (
            <></>
          )}
        </Text>
        <Flex vertical gap="10px">
          <ZewaButton variant="blue-b" onClick={handleStart}>
            Правила
          </ZewaButton>
          <ZewaButton variant="blue-b" onClick={handleSkip}>
            Начать
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

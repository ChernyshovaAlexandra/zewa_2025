import { useEffect, useState } from 'react';
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

  const ModalContent = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let active = true;
      fetch('/api/game/start')
        .then((res) => res.json())
        .then((data) => {
          if (!active) return;
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          if (!active) return;
          console.error(err);
          setLoading(false);
        });
      return () => {
        active = false;
      };
    }, []);

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

    return (
      <Flex vertical gap="20px">
        <Text size="p4" align="center" color="#596471">
          Добро пожаловать! Сейчас подробнее расскажем, как играть.
        </Text>
        <Flex vertical gap="10px">
          {!loading && (
            <ZewaButton variant="blue-b" onClick={handleStart}>
              Начать
            </ZewaButton>
          )}
          {!loading && (
            <ZewaButton variant="blue-b" onClick={handleSkip}>
              Пропустить
            </ZewaButton>
          )}
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

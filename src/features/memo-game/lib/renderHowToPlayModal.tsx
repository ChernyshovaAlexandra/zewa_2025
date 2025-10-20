import { useMemoGameProgressStore } from '../model/memoGameProgressStore';
import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton, Text } from '@/shared/ui';
import { Flex } from 'antd';

export const renderMemoHowToPlayModal = () => {
  const { openModal, closeModal } = useModalStore.getState();
  const { markHowToPlaySeen, hasCompletedOnboarding, startOnboarding } =
    useMemoGameProgressStore.getState();

  const handleStart = () => {
    markHowToPlaySeen();
    closeModal();
    if (!hasCompletedOnboarding) {
      startOnboarding();
    }
  };

  openModal({
    title: 'Как играть?',
    closable: false,
    content: (
      <Flex vertical gap="20px">
        <Text align="center" size="p4" color="#596471">
          Скоро появится полная версия игры «Мемо». Нажмите «Начать», чтобы перейти к обучению.
        </Text>
        <ZewaButton variant="blue-b" onClick={handleStart}>
          Начать
        </ZewaButton>
      </Flex>
    ),
  });
};

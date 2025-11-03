import { useState } from 'react';
import { Flex } from 'antd';
import { ZewaButton, Text } from '@/shared/ui';
import { apiService } from '@/services';
import { useMemoGameStore } from '../model/memoGameStore';

interface MemoHowToPlayModalContentProps {
  markHowToPlaySeen: () => void;
  hasCompletedOnboarding: boolean;
  startOnboarding: () => void;
  closeModal: () => void;
}

export const MemoHowToPlayModalContent = ({
  markHowToPlaySeen,
  hasCompletedOnboarding,
  startOnboarding,
  closeModal,
}: MemoHowToPlayModalContentProps) => {
  const selectedLevel = useMemoGameStore((s) => s.selectedLevel);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiService.gameStart({ game: 'memo', level: selectedLevel });
      if (response.data?.success) {
        markHowToPlaySeen();
        closeModal();
        if (!hasCompletedOnboarding) {
          startOnboarding();
        }
      } else {
        setError(response.data?.message ?? 'Не удалось начать игру. Попробуйте ещё раз.');
      }
    } catch (err) {
      console.error('memo gameStart error', err);
      setError('Не удалось начать игру. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex vertical gap="20px">
      <Text align="center" size="p4" color="#596471">
        Скоро появится полная версия игры «Мемо». Нажмите «Начать», чтобы перейти к обучению.
      </Text>
      {error ? (
        <Text align="center" size="p4" color="#ff5c5c">
          {error}
        </Text>
      ) : null}
      <ZewaButton variant="blue-b" onClick={handleStart} disabled={isSubmitting}>
        {isSubmitting ? 'Загрузка...' : 'Начать'}
      </ZewaButton>
    </Flex>
  );
};

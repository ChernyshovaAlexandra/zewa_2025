import { createElement } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { useMemoGameProgressStore } from '../model/memoGameProgressStore';
import { MemoHowToPlayModalContent } from './MemoHowToPlayModalContent';

export const renderMemoHowToPlayModal = () => {
  const { openModal, closeModal } = useModalStore.getState();
  const { markHowToPlaySeen, hasCompletedOnboarding, startOnboarding } =
    useMemoGameProgressStore.getState();

  openModal({
    title: 'Как играть?',
    closable: false,
    content: createElement(MemoHowToPlayModalContent, {
      markHowToPlaySeen,
      hasCompletedOnboarding,
      startOnboarding,
      closeModal,
    }),
  });
};

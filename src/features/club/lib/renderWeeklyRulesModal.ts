import { createElement } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { WeeklyRulesModalContent } from './WeeklyRulesModalContent';

export const renderWeeklyRulesModal = (onOpenClub?: () => void) => {
  useModalStore.getState().openModal({
    title: 'Правила недели',
    closable: true,
    content: createElement(WeeklyRulesModalContent, { onOpenClub }),
  });
};

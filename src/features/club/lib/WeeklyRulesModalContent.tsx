import { Flex } from 'antd';
import { FC } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { Text, ZewaButton } from '@/shared/ui';

interface WeeklyRulesModalContentProps {
  onOpenClub?: () => void;
}

export const WeeklyRulesModalContent: FC<WeeklyRulesModalContentProps> = ({ onOpenClub }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleOpenClub = () => {
    closeModal();
    onOpenClub?.();
  };

  return (
    <Flex vertical gap="12px" align="center">
      <Text size="p3" align="center" color="var(--main-blue)">
        Каждую неделю Домовёнок объявляет новое задание для участников клуба.
      </Text>
      <Text size="p4" align="center" color="#4076FF">
        Откройте раздел клуба, чтобы ознакомиться с актуальными правилами и получить награды.
      </Text>
      <ZewaButton variant="blue-b" onClick={handleOpenClub}>
        Посмотреть Клуб
      </ZewaButton>
    </Flex>
  );
};

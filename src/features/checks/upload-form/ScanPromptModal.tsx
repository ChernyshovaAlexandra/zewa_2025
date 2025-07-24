import React from 'react';
import { Text, ZewaButton, KeyboardIcon } from '@/shared/ui';
import { Flex } from 'antd';

interface Props {
  onClose: () => void;
  onManual: () => void;
}

export default function ScanPromptModal({ onClose, onManual }: Props) {
  return (
    <Flex vertical gap="10px" align="center">
      <Text size="p4" align="center">
        Фото не содержит правильного QR-кода. Попробуйте ввести данные вручную.
      </Text>
      <ZewaButton onClick={onManual} variant="blue-b">
        <Flex align="center" gap="5px">
          <KeyboardIcon /> Ввести вручную
        </Flex>
      </ZewaButton>
      <ZewaButton onClick={onClose} variant="blue-b">
        Отмена
      </ZewaButton>
    </Flex>
  );
}

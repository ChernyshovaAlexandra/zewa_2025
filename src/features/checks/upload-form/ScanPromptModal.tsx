import { Text, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import { ButtonManualAddCheck } from '../ButtonManualAddCheck';

interface Props {
  onClose: () => void;
}

export default function ScanPromptModal({ onClose }: Props) {
  return (
    <Flex vertical gap="10px" align="center">
      <Text size="p4" align="center">
        Фото не содержит правильного QR-кода. Попробуйте ввести данные вручную.
      </Text>
      <ButtonManualAddCheck />
      <ZewaButton onClick={onClose} variant="blue-b">
        Отмена
      </ZewaButton>
    </Flex>
  );
}

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
       Не удалось распознать QR-код на загруженном изображении. Попробуйте ввести данные вручную.
      </Text>
      <ButtonManualAddCheck />
      <ZewaButton style={{width: '100%'}} onClick={onClose} variant="blue-b">
        Отмена
      </ZewaButton>
    </Flex>
  );
}

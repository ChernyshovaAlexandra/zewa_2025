import { useModalStore } from '@/shared/model';
import { KeyboardIcon, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import { ManualInputForm } from './manual-input-form';

export const ButtonManualAddCheck = () => {
  const renderManualInputModal = () => {
    useModalStore.getState().openModal({
      title: 'Немного терпения...',
      closable: true,
      content: <ManualInputForm />,
    });
  };
  return (
    <ZewaButton style={{width: '100%'}} variant="blue-b" onClick={renderManualInputModal}>
      <Flex align="center" gap="5px">
        <KeyboardIcon /> Ввести вручную
      </Flex>
    </ZewaButton>
  );
};

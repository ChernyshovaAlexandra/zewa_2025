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
    <ZewaButton
      variant="blue-b"
      style={{
        textTransform: 'none',
        paddingRight: 0,
        paddingLeft: 0,
        width: '270px',
        margin: 'auto',
      }}
      onClick={renderManualInputModal}
    >
      <Flex align="center" gap="10px">
        <KeyboardIcon /> Ввести данные вручную
      </Flex>
    </ZewaButton>
  );
};

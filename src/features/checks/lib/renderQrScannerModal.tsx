import { useModalStore } from '@/shared/model/modalStore';
import { ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';

export const renderQrScannerModal = () => {
  useModalStore.getState().openModal({
    title: 'Сканер QR-кодов',
    closable: true,
    content: (
      <Flex vertical gap="10px">
        <ZewaButton variant="blue-b" onClick={() => {}}>
          СКАНИРОВАТЬ
        </ZewaButton>
        <ZewaButton variant="blue-b" onClick={() => {}}>
          ЗАГРУЗИТЬ СКРИНШОТ
        </ZewaButton>
        <ZewaButton variant="blue-b" onClick={() => {}}>
          ВВЕСТИ ДАННЫЕ ВРУЧНУЮ
        </ZewaButton>
      </Flex>
    ),
  });
};

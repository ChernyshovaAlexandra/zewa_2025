import { useModalStore } from '@/shared/model/modalStore';
import { KeyboardIcon, ScanWhiteIcon, ScreenshotIcon, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';

export const renderQrScannerModal = () => {
  useModalStore.getState().openModal({
    title: 'Сканер QR-кодов',
    closable: true,
    content: (
      <Flex vertical gap="10px">
        <ZewaButton variant="blue-b" onClick={() => {}}>
          <Flex align="center" gap="5px">
            <ScanWhiteIcon /> Сканировать
          </Flex>
        </ZewaButton>
        <ZewaButton variant="blue-b" onClick={() => {}}>
          <Flex align="center" gap="5px">
            <ScreenshotIcon /> Загрузить скриншот
          </Flex>
        </ZewaButton>
        <ZewaButton variant="blue-b" onClick={() => {}}>
          <Flex align="center" gap="5px">
            <KeyboardIcon /> Ввести вручную
          </Flex>
        </ZewaButton>
      </Flex>
    ),
  });
};

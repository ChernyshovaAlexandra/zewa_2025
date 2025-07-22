import { Flex } from 'antd';

import { KeyboardIcon, ScanWhiteIcon, ScreenshotIcon, ZewaButton } from '@/shared/ui';
import { useModalStore } from '@/shared/model/modalStore';
import { ManualInputForm } from './ManualInputForm';
import { renderUploadFormModal } from './lib/renderUploadFormModal';
import { useReceiptScan } from '@/hooks';
import { ScannerBox } from './style';
import { Scanner } from '@yudiel/react-qr-scanner';
import useWindowSize from '@/hooks/useWindowSize';

export function ScannerComponent() {
  const { openTelegramScanner, pending, onQrScanned } = useReceiptScan();
  const { isMobile } = useWindowSize();
  navigator.mediaDevices.enumerateDevices().then(console.table);
  console.log('supports', OffscreenCanvas);

  const showLocalScanner = () => {
    useModalStore.getState().openModal({
      title: 'Сканер qr-кодов',
      closable: true,
      content: (
        <ScannerBox>
          <Scanner
            onScan={(codes) => {
              onQrScanned(codes[0].rawValue);
              console.log('SCAN', codes);
            }}
            onError={(e) => console.log('ERR', e)}
            scanDelay={500}
          />
        </ScannerBox>
      ),
    });
  };

  const renderManualInputModal = () => {
    useModalStore.getState().openModal({
      title: 'Ручной ввод',
      closable: true,
      content: <ManualInputForm />,
    });
  };

  return (
    <Flex vertical gap="10px">
      <ZewaButton
        variant="blue-b"
        onClick={isMobile ? openTelegramScanner : showLocalScanner}
        disabled={pending}
      >
        <Flex align="center" gap="5px">
          <ScanWhiteIcon /> Сканировать
        </Flex>
      </ZewaButton>

      <ZewaButton variant="blue-b" onClick={renderUploadFormModal}>
        <Flex align="center" gap="5px">
          <ScreenshotIcon /> Загрузить скриншот
        </Flex>
      </ZewaButton>

      <ZewaButton variant="blue-b" onClick={renderManualInputModal}>
        <Flex align="center" gap="5px">
          <KeyboardIcon /> Ввести вручную
        </Flex>
      </ZewaButton>
    </Flex>
  );
}

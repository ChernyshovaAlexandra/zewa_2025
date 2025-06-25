import { useEffect } from 'react';
import { Flex } from 'antd';
import { Scanner } from '@yudiel/react-qr-scanner';

import { telegramService } from '@/services/TelegramService';
import { useModalStore } from '@/shared/model/modalStore';
import { KeyboardIcon, ScanWhiteIcon, ScreenshotIcon, ZewaButton, Text } from '@/shared/ui';
import { ManualInputForm } from './ManualInputForm';
import { parseReceipt } from './lib/parseReceipt';
import { renderUploadFormModal } from './lib/renderUploadFormModal';
import { ScannerBox } from './style';

const renderManualInputModal = () => {
  useModalStore.getState().openModal({
    title: 'Ручной ввод',
    closable: true,
    content: <ManualInputForm />,
  });
};

const renderScanErrorModal = (message: string) => {
  useModalStore.getState().openModal({
    title: 'Чек не распознан',
    closable: true,
    content: (
      <Flex vertical gap="10px">
        <Text size="p4" align="center">
          {message}
        </Text>
        <ZewaButton variant="blue-b" onClick={renderManualInputModal}>
          <Flex align="center" gap="5px">
            <KeyboardIcon /> Ввести вручную
          </Flex>
        </ZewaButton>
        <ZewaButton variant="blue-b" onClick={renderUploadFormModal}>
          <Flex align="center" gap="5px">
            <ScreenshotIcon /> Загрузить фото
          </Flex>
        </ZewaButton>
      </Flex>
    ),
  });
};

export function ScannerComponent() {
  useEffect(() => {
    const handleQr = (...args: unknown[]) => {
      const code = args[0] as string;
      try {
        parseReceipt(code);
        useModalStore.getState().closeModal();
      } catch (e) {
        renderScanErrorModal((e as Error).message);
      }
    };

    const handleError = () => {
      renderScanErrorModal('Произошла ошибка при сканировании');
    };

    telegramService.onEvent('qrCodeReceived', handleQr);
    telegramService.onEvent('onScanError', handleError);
    telegramService.onEvent('scanQrPopupClosed', handleError);
  }, []);
  
  const handleScan = () => {};
  
  const showScanQrPopup = () => {
    useModalStore.getState().openModal({
      title: 'title',
      closable: true,
      content: (
        <ScannerBox>
          <Scanner
            // paused={error || message ? true : false}
            // onError={(error: any) => {
            //   setOnHandleScanError(true);
            //   setTitle(`Ой-ой-ой...<br/>Что-то пошло не так`);
            //   if (error.message && error.message.indexOf('Permission denied') !== -1) {
            //     setPemissionFailed(true);
            //     setError(
            //       `Не удалось получить доступ к камере. Проверьте настройки браузера и разрешения или добавьте чек другим способом.`,
            //     );
            //   } else {
            //     setError(`Попробуйте ввести код из чека вручную.`);
            //   }
            // }}
            formats={['qr_code', 'micro_qr_code', 'rm_qr_code']}
            onScan={handleScan}
            scanDelay={1000}
          />
        </ScannerBox>
      ),
    });

    // )}
  };

  return (
    <Flex vertical gap="10px">
      <ZewaButton variant="blue-b" onClick={() => showScanQrPopup()}>
        <Flex align="center" gap="5px">
          <ScanWhiteIcon /> Сканировать чек
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

import { useEffect } from 'react';
import { Flex } from 'antd';
import { telegramService } from '@/services/TelegramService';
import { useModalStore } from '@/shared/model/modalStore';
import { KeyboardIcon, ScanWhiteIcon, ScreenshotIcon, ZewaButton, Text } from '@/shared/ui';
import { parseReceipt } from './lib/parseReceipt';

const renderManualInputModal = () => {
  useModalStore.getState().openModal({
    title: 'Ручной ввод',
    closable: true,
    content: <div>TODO: manual input</div>,
  });
};

const renderUploadFormModal = () => {
  useModalStore.getState().openModal({
    title: 'Загрузить фото',
    closable: true,
    content: <div>TODO: upload form</div>,
  });
};

const renderScanErrorModal = (message: string) => {
  useModalStore.getState().openModal({
    title: 'Чек не распознан',
    closable: true,
    content: (
      <Flex vertical gap="10px">
        <Text size="p4" align="center">{message}</Text>
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
    const handleQr = (code: string) => {
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

  return (
    <Flex vertical gap="10px">
      <ZewaButton variant="blue-b" onClick={() => telegramService.showScanQrPopup()}>
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

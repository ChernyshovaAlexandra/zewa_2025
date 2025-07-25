/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from 'antd';

import { ScanWhiteIcon, Text, ZewaButton } from '@/shared/ui';
import { useModalStore } from '@/shared/model/modalStore';
import { useReceiptScan } from '@/hooks';
import { ScannerBox } from './style';
import { Scanner } from '@yudiel/react-qr-scanner';
import useWindowSize from '@/hooks/useWindowSize';
import { ButtonManualAddCheck } from './ButtonManualAddCheck';
import { ButtonUploadCheck } from './ButtonUploadCheck';

export function ScannerComponent() {
  const { openTelegramScanner, pending, onQrScanned, setScannerNotAllowed, scanerNotAllowed } =
    useReceiptScan();
  const { isMobile } = useWindowSize();

  const showLocalScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());

      useModalStore.getState().openModal({
        title: 'Сканер qr-кодов',
        closable: true,
        content: (
          <ScannerBox>
            <Scanner
              onScan={(codes) => onQrScanned(codes[0].rawValue)}
              onError={(e) => handleScannerError(e)}
              scanDelay={500}
            />
          </ScannerBox>
        ),
      });
    } catch (e: any) {
      if (e.name === 'NotAllowedError' || e.name === 'SecurityError') {
        setScannerNotAllowed();
        useModalStore.getState().openModal({
          title: 'Ошибка доступа',
          content: (
            <Text size="p4" align="center">
              Пожалуйста, разрешите доступ к камере в настройках браузера, чтобы использовать сканер
              QR-кодов.
            </Text>
          ),
        });
      } else {
        useModalStore.getState().openModal({
          title: 'Ошибка камеры',
          content: (
            <Text size="p4" align="center">
              Не удалось получить доступ к камере: {e.message}
            </Text>
          ),
        });
      }
    }
  };

  const handleScannerError = (error: any) => {
    if (error?.name === 'NotAllowedError') {
      setScannerNotAllowed();
      useModalStore.getState().openModal({
        title: 'Ошибка доступа',
        content: (
          <Text size="p4" align="center">
            Разрешите доступ к камере в браузере.
          </Text>
        ),
      });
    } else {
      console.error(error);
    }
  };

  return (
    <Flex vertical gap="10px">
      <ZewaButton
        variant="blue-b"
        onClick={isMobile ? openTelegramScanner : showLocalScanner}
        disabled={pending || scanerNotAllowed}
      >
        <Flex align="center" gap="5px">
          <ScanWhiteIcon /> Сканировать
        </Flex>
      </ZewaButton>
      <ButtonUploadCheck />
      <ButtonManualAddCheck />
    </Flex>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { telegramService } from '@/services/TelegramService';
// import { renderUploadFormModal } from './lib/renderUploadFormModal';
// import { ManualInputForm } from './ManualInputForm';
import { KeyboardIcon, ScreenshotIcon, ZewaButton, Text } from '@/shared/ui';
import { Flex } from 'antd';
import { parseReceipt } from '@/features/checks/lib/parseReceipt';
import { ApiData, apiService, ApiService } from '@/services';

type UploadResponse = ApiData<ReturnType<ApiService['addCheck']>>;

export interface UseReceiptScanReturn {
  /** запустить VK Code Reader */
  openTelegramScanner: () => void;
  /** будет вызвано из компонента `Scanner` при локальном сканировании камеры */
  onQrScanned: (raw: string) => void;
  /** true – мы что-то отправляем на сервер */
  pending: boolean;
  hideModal: () => void;
  setScannerNotAllowed: (arg: boolean) => void;
  scanerNotAllowed: boolean;
}

export function useReceiptScan(): UseReceiptScanReturn {
  const [pending, setPending] = useState(false);
  const [scanerNotAllowed, setScannerNotAllowed] = useState(false);
  const apiAbort = useRef<AbortController | null>(null);

  const renderManualInputModal = useCallback(() => {
    useModalStore.getState().openModal({
      title: 'Ручной ввод',
      closable: true,
      content: <></>,
    });
  }, []);

  /** общий рендер для ошибок сканирования / парсинга */
  const renderScanErrorModal = useCallback(
    (message: string) => {
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
            <ZewaButton
              variant="blue-b"
              onClick={
                () => {}
                // renderUploadFormModal
              }
            >
              <Flex align="center" gap="5px">
                <ScreenshotIcon /> Загрузить фото
              </Flex>
            </ZewaButton>
          </Flex>
        ),
      });
    },
    [renderManualInputModal],
  );

  /** универсальный обработчик ответа */
  const handleApiResponse = useCallback(
    (resp: UploadResponse) => {
      setPending(false);

      if (resp.success) {
        useModalStore.getState().openModal({
          title: 'Успех',
          closable: true,
          content: (
            <Text size="p4" align="center">
              Чек отправлен на модерацию
            </Text>
          ),
        });
      } else {
        renderScanErrorModal(resp.message ?? 'Ошибка при отправке чека');
      }
    },
    [renderScanErrorModal],
  );

  /** отправить данные на сервер */
  const sendReceipt = useCallback(
    async (raw: string) => {
      let parsed;

      try {
        parsed = parseReceipt(raw); // { fn, fd, fp, sum, date }
      } catch (e) {
        renderScanErrorModal((e as Error).message);
        return;
      }

      const userId = telegramService.getUser()?.id;
      if (!userId) {
        renderScanErrorModal('Не удалось определить telegram_id');
        return;
      }

      setPending(true);
      apiAbort.current?.abort();
      apiAbort.current = new AbortController();

      try {
        const resp = await apiService.addCheck(
          {
            telegram_id: userId,
            fn: parsed.fn,
            fd: parsed.fd,
            fp: parsed.fp,
            sum: parsed.sum,
            date: parsed.date,
          },
          // Axios 1.x принимает объект вторым аргументом как data,
          // а signal кладется третьим, поэтому оборачиваем в config:
          // apiService.addCheck(data, { signal }) ❌
        );

        handleApiResponse(resp.data); // ✅ resp.data — то, что вернул сервер
      } catch {
        renderScanErrorModal('Сеть недоступна или сервер не отвечает');
        setPending(false);
      }
    },
    [handleApiResponse, renderScanErrorModal],
  );

  /** обработчик Telegram-событий */
  useEffect(() => {
    const qrListener = (...args: unknown[]) => {
      const code = String(args[0] ?? '');
      void sendReceipt(code);
    };
    const handleError = () => renderScanErrorModal('Сканирование отменено');

    telegramService.onEvent('qrCodeReceived', qrListener);
    telegramService.onEvent('onScanError', handleError);
    telegramService.onEvent('scanQrPopupClosed', handleError);

    return () => {
      telegramService.offEvent('qrCodeReceived', qrListener);
      telegramService.offEvent('onScanError', handleError);
      telegramService.offEvent('scanQrPopupClosed', handleError);
      apiAbort.current?.abort();
    };
  }, [sendReceipt, renderScanErrorModal]);

  const openTelegramScanner = useCallback(() => {
    const ok = telegramService.showScanQrPopup();
    if (!ok) {
      renderScanErrorModal('Сканер Telegram недоступен в этой среде');
    }
  }, [renderScanErrorModal]);

  const hideModal = useCallback(() => {}, []);

  return {
    openTelegramScanner,
    onQrScanned: sendReceipt,
    pending,
    hideModal,
    setScannerNotAllowed,
    scanerNotAllowed,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { telegramService } from '@/services/TelegramService';
import { AddCheckResponse } from '@/services/ApiService';
import { Text } from '@/shared/ui';
import { Flex } from 'antd';
import { parseReceipt } from '@/features/checks/lib/parseReceipt';
import { apiService } from '@/services/ApiService';
import { applyNbsp } from '../utils/nbsp';
import { useUserStore } from '@/shared/model';
import { ButtonManualAddCheck } from '@/features/checks/ButtonManualAddCheck';
import { ButtonUploadCheck } from '@/features/checks/ButtonUploadCheck';
import { Spinner } from '@vkontakte/vkui';

export function useReceiptScan() {
  const [pending, setPending] = useState(false);
  const apiAbort = useRef<AbortController | null>(null);
  const { user } = useUserStore.getState();

  const renderScanErrorModal = useCallback((message: string) => {
    useModalStore.getState().openModal({
      title: 'Сканер QR-кодов',
      closable: true,
      content: (
        <Flex vertical gap="10px">
          <Text size="p4" align="center">
            {applyNbsp(message)}
          </Text>
          <ButtonManualAddCheck />
          <ButtonUploadCheck />
        </Flex>
      ),
    });
  }, []);

  const showPendingModal = useCallback(() => {
    useModalStore.getState().openModal({
      title: 'Проверка чека',
      closable: false,
      content: (
        <Flex vertical gap="12px" align="center" style={{ padding: '10px 0' }}>
          <Spinner size="medium" />
          <Text size="p4" align="center">
            Пожалуйста, подождите — проверяем чек
          </Text>
        </Flex>
      ),
    });
  }, []);

  const handleApiResponse = useCallback(
    (data: AddCheckResponse) => {
      if (data.success) {
        useModalStore.getState().openModal({
          title: 'Проверка чека',
          closable: true,
          content: (
            <>
              <Text size="p4" align="center">
                {data.message ??
                  `После проверки мы зарегистрируем чек, начислим вам монеты и пришлём уведомление об этом.`}
              </Text>
            </>
          ),
        });
      } else {
        console.info(data);
        renderScanErrorModal(data?.message ?? 'Ошибка при отправке чека');
      }
    },
    [renderScanErrorModal],
  );

  const sendReceipt = useCallback(
    async (raw: string) => {
      const qrPattern = /t=\d{8}T\d{4}&s=\d+\.\d{2}&fn=\d{16}&i=\d+&fp=\d+&n=\d+/;
      if (!qrPattern.test(raw)) {
        renderScanErrorModal('Некорректный формат QR-кода. Пожалуйста, используйте валидный чек.');
        return;
      }

      let parsed;
      try {
        parsed = parseReceipt(raw);
      } catch (e: any) {
        renderScanErrorModal(e.message);
        return;
      }

      const userId = telegramService.getUser()?.id;
      if (!userId) {
        renderScanErrorModal('Не удалось определить id пользователя');
        return;
      }

      setPending(true);
      showPendingModal();
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
          { signal: apiAbort.current.signal },
        );
        handleApiResponse(resp.data);
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          renderScanErrorModal('Сеть недоступна или сервер не отвечает');
        }
      } finally {
        setPending(false);
      }
    },
    [handleApiResponse, renderScanErrorModal, showPendingModal],
  );

  const handlePhotoUpload = useCallback(
    async (photoFile: File) => {
      try {
        setPending(true);
        showPendingModal();
        const reader = new FileReader();

        reader.onloadend = async () => {
          const imgBase64 = reader.result as string;
          const resp = await apiService.addCheckImageManual({
            telegram_id: user?.id || 0,
            img: imgBase64,
          });
          handleApiResponse(resp.data);
        };

        reader.onerror = () => {
          renderScanErrorModal('Ошибка при конвертации файла.');
          setPending(false);
        };

        reader.readAsDataURL(photoFile);
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          renderScanErrorModal('Сеть недоступна или сервер не отвечает');
        }
      } finally {
        setPending(false);
      }
    },
    [handleApiResponse, renderScanErrorModal, showPendingModal, user?.id],
  );

  const openTelegramScanner = async () => {
    try {
      const raw: { data: string } = await telegramService.showScanQrPopup();
      sendReceipt(raw.data);
    } catch (e: any) {
      renderScanErrorModal(
        e.message === 'popup-closed'
          ? 'Сканирование отменено.'
          : 'Ошибка при сканировании QR-кода.',
      );
    }
  };

  return {
    openTelegramScanner,
    handlePhotoUpload,
    onQrScanned: sendReceipt,
    pending,
    hideModal: () => {},
    setScannerNotAllowed: () => {},
    scanerNotAllowed: false,
  };
}

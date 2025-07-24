/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState, useCallback } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { validateQRCode } from '@/utils/qr';
import ScanPromptModal from './ScanPromptModal';
import { ManualInputForm } from '../ManualInputForm';
import { useReceiptScan } from '@/hooks';

export function useUploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { openModal, closeModal: hideModal } = useModalStore.getState();
  const { handlePhotoUpload: uploadScreenshot } = useReceiptScan();

  const [pending, setPending] = useState(false);

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setPending(true);

      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        openModal({
          title: 'Неверный файл',
          closable: true,
          content: 'Пожалуйста, выберите изображение.',
        });
        return;
      }

      // 1) Валидация QR
      const isValid = await validateQRCode(file);
      if (!isValid) {
        openModal({
          title: 'Чек не распознан',
          closable: true,
          content: (
            <ScanPromptModal
              onClose={() => hideModal()}
              onManual={() => {
                hideModal();
                openModal({
                  title: 'Ручной ввод',
                  closable: true,
                  content: <ManualInputForm />,
                });
              }}
            />
          ),
        });
        setPending(false);
        return;
      }

      try {
        setPending(true);
        await uploadScreenshot(file);
      } catch (err: any) {
        openModal({
          title: 'Ошибка',
          closable: true,
          content: err.message ?? 'Не удалось загрузить фото.',
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal, hideModal],
  );

  return {
    inputRef,
    handleFileChange,
    pending,
  };
}

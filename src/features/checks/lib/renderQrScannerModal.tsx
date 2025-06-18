import { useModalStore } from '@/shared/model/modalStore';
import { ScannerComponent } from '../ScannerComponent';

export const renderQrScannerModal = () => {
  useModalStore.getState().openModal({
    title: 'Сканер QR-кодов',
    closable: true,
    content: <ScannerComponent />,
  });
};

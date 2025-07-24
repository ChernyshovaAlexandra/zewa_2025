import { useModalStore } from '@/shared/model/modalStore';
import { UploadForm } from '../upload-form';


export const renderUploadFormModal = () => {
  useModalStore.getState().openModal({
    title: 'Загрузить фото',
    closable: true,
    content: <UploadForm />,
  });
};

import { useModalStore } from '@/shared/model/modalStore';
import { Flex } from 'antd';
import { Text } from '@/shared/ui';
import { ChangeEvent, useRef } from 'react';
import { uploadScreenshot } from './uploadScreenshot';

function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadScreenshot(file);
    }
  };

  return (
    <Flex vertical gap="10px" align="center">
      <Text size="p4" align="center">
        Выберите изображение с QR-кодом
      </Text>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
    </Flex>
  );
}

export const renderUploadFormModal = () => {
  useModalStore.getState().openModal({
    title: 'Загрузить фото',
    closable: true,
    content: <UploadForm />,
  });
};

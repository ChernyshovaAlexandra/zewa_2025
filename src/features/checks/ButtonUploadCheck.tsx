import { ScreenshotIcon, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import { renderUploadFormModal } from './lib/renderUploadFormModal';

export const ButtonUploadCheck = () => {
  return (
    <ZewaButton variant="blue-b" onClick={renderUploadFormModal}>
      <Flex align="center" gap="5px">
        <ScreenshotIcon /> Загрузить скриншот
      </Flex>
    </ZewaButton>
  );
};

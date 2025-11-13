import { ScreenshotIcon, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import { renderUploadFormModal } from './lib/renderUploadFormModal';

export const ButtonUploadCheck = () => {
  return (
    <ZewaButton
      variant="blue-b"
      style={{
        textTransform: 'none',
        paddingRight: 0,
        paddingLeft: 0,
        width: '270px',
        margin: 'auto',
      }}
      onClick={renderUploadFormModal}
    >
      <Flex align="center" gap="10px">
        <ScreenshotIcon /> Загрузить скриншот
      </Flex>
    </ZewaButton>
  );
};

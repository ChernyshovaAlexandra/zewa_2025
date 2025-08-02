import React from 'react';
import styled from 'styled-components';
import { File, FormItem, Group, Spinner } from '@vkontakte/vkui';
import { Icon24Camera } from '@vkontakte/icons';
import { useUploadForm } from './useUploadForm';
import { Text } from '@/shared/ui';

export function UploadForm() {
  const { handleFileChange, pending } = useUploadForm();

  return (
    <Group>
      <StyledFormItem top={pending ? '' : 'Загрузите фото чека'}>
        {pending ? (
          <>
            <Text>Проверяем загруженное фото. Не закрывайте окно.</Text>
            <Spinner size="m" style={{ margin: '0 auto' }} />
          </>
        ) : (
          <File
            before={<Icon24Camera role="presentation" />}
            size="m"
            onChange={handleFileChange}
            accept="image/*"
          >
            Открыть галерею
          </File>
        )}
      </StyledFormItem>
    </Group>
  );
}

const StyledFormItem = styled(FormItem)`
  span {
    color: #1d2023;
  }
  label {
    background: linear-gradient(180deg, #2d59df 0%, #0f3bc1 100%) !important;
    box-shadow: 0px -1px 2px 0px #001da3 !important;
    span {
      color: white !important;
    }
  }
`;

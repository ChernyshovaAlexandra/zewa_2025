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
    background: #193f74 !important;
    box-shadow: none !important;
    span {
      color: white !important;
    }
  }
`;

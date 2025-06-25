import { useModalStore } from '@/shared/model/modalStore';
import { Text } from '@/shared/ui';

export const showModal = (title: string, message: string, closable = false) => {
  useModalStore.getState().openModal({
    title,
    closable,
    content: (
      <Text size="p4" align="center">
        {message}
      </Text>
    ),
  });
};

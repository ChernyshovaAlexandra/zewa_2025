import { useModalStore } from '@/shared/model/modalStore';
import { Text, ZewaButton } from '@/shared/ui';

export const showModal = (
  title: string,
  message: string,
  closable = false,
  actionLabel?: string,
) => {
  const { closeModal, openModal } = useModalStore.getState();

  openModal({
    title,
    closable,
    content: (
      <>
        <Text size="p4" align="center">
          {message}
        </Text>
        {actionLabel ? (
          <ZewaButton
            style={{ marginTop: 16 }}
            variant="blue-b"
            onClick={() => {
              closeModal();
            }}
          >
            {actionLabel}
          </ZewaButton>
        ) : null}
      </>
    ),
  });
};

import { useModalStore } from '@/shared/model/modalStore';
import { CancelIcon } from '@/shared/ui/icons';
import { ModalCard, ModalContent, ModalTitle, Overlay, CloseBtn, ModalCardInner } from './style';

export const ZewaModal = () => {
  const { isOpen, data, closeModal } = useModalStore();
  if (!isOpen || !data) return null;

  const isClosable = data.closable !== false;

  return (
    <Overlay>
      <ModalCard>
        {isClosable && (
          <CloseBtn onClick={closeModal}>
            <CancelIcon />
          </CloseBtn>
        )}
        {data.title && <ModalTitle size="h2">{data.title}</ModalTitle>}
        <ModalCardInner>
          <ModalContent>{data.content}</ModalContent>
        </ModalCardInner>
      </ModalCard>
    </Overlay>
  );
};

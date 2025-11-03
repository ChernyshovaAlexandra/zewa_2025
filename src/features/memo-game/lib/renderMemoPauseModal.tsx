import { Flex } from 'antd';
import { ZewaButton } from '@/shared/ui';
import { useModalStore } from '@/shared/model/modalStore';

interface RenderMemoPauseModalParams {
  onResume: () => void;
  onRules: () => void | Promise<void>;
  onExit: () => void | Promise<void>;
}

export function renderMemoPauseModal({ onResume, onRules, onExit }: RenderMemoPauseModalParams) {
  const { openModal, closeModal } = useModalStore.getState();

  openModal({
    title: 'Пауза',
    closable: false,
    content: (
      <Flex vertical gap="16px" align="center">
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            onResume();
          }}
        >
          Продолжить
        </ZewaButton>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            onRules();
          }}
        >
          Правила игры
        </ZewaButton>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            onExit();
          }}
        >
          Выйти из игры
        </ZewaButton>
      </Flex>
    ),
  });
}

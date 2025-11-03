import { Flex } from 'antd';
import { Text, ZewaButton } from '@/shared/ui';
import { useModalStore } from '@/shared/model/modalStore';
import { applyNbsp } from '@/utils/nbsp';

interface RenderMemoRulesModalParams {
  onClose: () => void;
}

const RULES_TEXT = [
  'На поле лежат перевёрнутые карточки с изображениями. Открывайте их по две, чтобы найти одинаковые пары.',
  'Если карточки совпали, они остаются открытыми и вы получаете снежинку. Если нет — карточки снова переворачиваются.',
  'Найдите все пары до окончания таймера. Каждая пара — это ещё один шаг к победе!',
];

export function renderMemoRulesModal({ onClose }: RenderMemoRulesModalParams) {
  const { openModal, closeModal } = useModalStore.getState();

  openModal({
    title: 'Правила игры',
    closable: false,
    content: (
      <Flex vertical gap="16px">
        <Flex vertical gap="8px">
          {RULES_TEXT.map((line, index) => (
            <Text key={index} size="p4" color="#596471">
              {applyNbsp(line)}
            </Text>
          ))}
        </Flex>
        <ZewaButton
          variant="blue-b"
          onClick={() => {
            closeModal();
            onClose();
          }}
        >
          Вернуться в игру
        </ZewaButton>
      </Flex>
    ),
  });
}

import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { useModalStore } from '@/shared/model/modalStore';
import { ReloadIcon, Text, ZewaButton } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { applyNbsp } from '@/utils';

export const renderGameOverModal = (score: number, navigate: ReturnType<typeof useNavigate>) => {
  const { closeModal } = useModalStore.getState();
  const { resetGame } = useGameModelStore.getState();

  useModalStore.getState().openModal({
    title: 'Конец игры',
    closable: false,
    content: (
      <Flex vertical gap="20px">
        <Text size="p4" align="center" color="#596471">
          {applyNbsp(`Все жизни закончились. Свой результат можно увидеть в Турнирной таблице. 
        Чтобы заработать больше монет в игре, загрузите чек из «Магнита» с продукцией Zewa.`)}
        </Text>
        <Flex vertical gap="10px">
          <ZewaButton
            variant="blue-b"
            onClick={() => {
              closeModal();
              resetGame();
            }}
          >
            <Flex gap={'10px'} align="center">
              <ReloadIcon /> Играть ещё
            </Flex>
          </ZewaButton>
          <ZewaButton
            variant="blue-b"
            onClick={() => {
              navigate('/tournament');
              closeModal();
            }}
          >
            Турнирная таблица
          </ZewaButton>
          <ZewaButton
            variant="blue-b"
            onClick={() => {
              navigate('/');
              closeModal();
            }}
          >
            Выйти из игры
          </ZewaButton>
        </Flex>
      </Flex>
    ),
  });
};

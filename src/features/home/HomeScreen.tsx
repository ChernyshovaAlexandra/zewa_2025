import {
  HomeWrapper,
  ButtonsWrapper,
  Backpack,
  BackpackContainer,
  Navigation,
} from './HomeScreen.styles';
import { PlayIcon, ScanIcon, UserIcon, ZewaButton } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <Navigation>
        <Flex justify="space-between">
          <ZewaButton variant="white">
            <Flex gap="6px">
              <img src="/assets/images/coin-icon.png" alt="монетка" />
              745
            </Flex>
          </ZewaButton>
          <ZewaButton variant="white">
            <UserIcon />
          </ZewaButton>
        </Flex>
      </Navigation>
      <BackpackContainer>
        <Backpack src="/assets/images/backpack.png" alt="Backpack" />
        <ZewaButton variant="play" icon={<PlayIcon />} onClick={() => navigate('/game')}>
          ИГРАТЬ
        </ZewaButton>
      </BackpackContainer>
      <ButtonsWrapper>
        <ZewaButton style={{ padding: '14px' }} variant="white" icon={<ScanIcon />}>
          Загрузить чек
        </ZewaButton>
        <ZewaButton style={{ padding: '14px' }} variant="white" onClick={() => navigate('/rules')}>
          Правила участия
        </ZewaButton>
      </ButtonsWrapper>
    </HomeWrapper>
  );
}

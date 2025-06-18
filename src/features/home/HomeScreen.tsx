import {
  HomeWrapper,
  ButtonsWrapper,
  Backpack,
  BackpackContainer,
  Navigation,
} from './HomeScreen.styles';
import { PlayIcon, ScanIcon, TournamentIcon, UserIcon, ZewaButton } from '@/shared/ui';
import { renderQrScannerModal } from '@/features';
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
              <img src="./assets/images/coin-icon.png" alt="монетка" />
              745
            </Flex>
          </ZewaButton>
          <Flex gap="10px">
            <ZewaButton variant="white" onClick={() => navigate('/tournament')}>
              <TournamentIcon />
            </ZewaButton>
            <ZewaButton variant="white" onClick={() => navigate('/profile')}>
              <UserIcon />
            </ZewaButton>
          </Flex>
        </Flex>
      </Navigation>
      <BackpackContainer>
        <Backpack src="./assets/images/backpack.png" alt="Backpack" />
        <ZewaButton variant="play" icon={<PlayIcon />} onClick={() => navigate('/game')}>
          ИГРАТЬ
        </ZewaButton>
      </BackpackContainer>
      <ButtonsWrapper>
        <ZewaButton
          style={{ padding: '14px' }}
          variant="white"
          icon={<ScanIcon />}
          onClick={renderQrScannerModal}
        >
          Сканировать чек
        </ZewaButton>
        <ZewaButton style={{ padding: '14px' }} variant="white" onClick={() => navigate('/rules')}>
          Правила участия
        </ZewaButton>
      </ButtonsWrapper>
    </HomeWrapper>
  );
}

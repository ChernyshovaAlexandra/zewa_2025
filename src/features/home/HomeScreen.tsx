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
import PrizesScale from '../prizes-scale';
import { Coins } from '../coins/Coins';

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <Navigation>
        <Flex justify="space-between">
          <Coins />

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
        <Backpack src="./assets/images/backpack.webp" alt="Backpack" />
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
          Загрузить чек
        </ZewaButton>
        <ZewaButton style={{ padding: '14px' }} variant="white" onClick={() => navigate('/rules')}>
          Правила участия и FAQ
        </ZewaButton>
      </ButtonsWrapper>
      <PrizesScale />
    </HomeWrapper>
  );
}

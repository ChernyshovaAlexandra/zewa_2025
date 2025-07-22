import {
  HomeWrapper,
  ButtonsWrapper,
  Backpack,
  BackpackContainer,
  Navigation,
} from './HomeScreen.styles';
import { useEffect, useState } from 'react';
import { OnboardingScreen } from '../onboarding';
import { PlayIcon, ScanIcon, TournamentIcon, UserIcon, ZewaButton } from '@/shared/ui';
import { renderQrScannerModal } from '@/features';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import PrizesScale from '../prizes-scale';
import { Coins } from '../coins/Coins';

const ONBOARDING_KEY = 'home_onboarding_viewed';

export function HomeScreen() {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    try {
      const viewed = window.localStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(!viewed);
    } catch {
      setShowOnboarding(false);
    }
  }, []);

  const handleFinishOnboarding = () => {
    try {
      window.localStorage.setItem(ONBOARDING_KEY, 'true');
    } catch {}
    setShowOnboarding(false);
  };

  return showOnboarding ? (
    <OnboardingScreen onFinish={handleFinishOnboarding} />
  ) : (
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

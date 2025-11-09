import { HomeWrapper, ButtonsWrapper, Navigation } from './HomeScreen.styles';
import { PlayIcon, ScanIcon, TournamentIcon, UserIcon, ZewaButton } from '@/shared/ui';
import { renderQrScannerModal } from '@/features';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import PrizesScale from '../prizes-scale';
import { Coins } from '../coins/Coins';
import { CLUB_ONBOARDING_KEY } from '../club/constants';

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

      <ButtonsWrapper>
        <div
          style={{
            width: '100%',
            marginTop: '-5.5rem',
            position: 'relative',
          }}
        >
          <img
            style={{
              position: 'relative',
              top: '1rem',
              width: '100%',
            }}
            src="/assets/images/btn-bg.webp"
            alt="btn-bg"
          />
          <ZewaButton
            style={{
              position: 'relative',
              width: '100%',
            }}
            variant="play"
            icon={<PlayIcon />}
            onClick={() => navigate('/game/memo/levels')}
          >
            ИГРАТЬ
          </ZewaButton>
        </div>
        <ZewaButton variant="white" icon={<ScanIcon />} onClick={renderQrScannerModal}>
          ЗАГРУЗИТЬ ЧЕК
        </ZewaButton>
        <ZewaButton variant="white" onClick={() => navigate('/rules')}>
          Правила участия и FAQ
        </ZewaButton>
        <ZewaButton
          style={{ padding: '14px', color: '#E53375' }}
          variant="white"
          onClick={() => {
            const hasWindow = typeof window !== 'undefined';
            const hasSeenClub =
              hasWindow && window.localStorage.getItem(CLUB_ONBOARDING_KEY) === 'true';
            navigate(hasSeenClub ? '/club' : '/club/onboarding');
          }}
        >
          Клуб помощников Домовёнка
        </ZewaButton>
      </ButtonsWrapper>
      <PrizesScale />
    </HomeWrapper>
  );
}

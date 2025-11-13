import { HomeWrapper, ButtonsWrapper, Navigation, Snow } from './HomeScreen.styles';
import { PlayIcon, ScanIcon, TournamentIcon, UserIcon, ZewaButton } from '@/shared/ui';
import { renderQrScannerModal } from '@/features';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import PrizesScale from '../prizes-scale';
import { Coins } from '../coins/Coins';
import { CLUB_ONBOARDING_KEY } from '../club/constants';
import { useEffect } from 'react';

export function HomeScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const container = document.querySelector('.snow-container');
    if (!container) return;

    let created = 0;
    const total = 35;

    const interval = setInterval(() => {
      if (created >= total) {
        clearInterval(interval);
        return;
      }

      const flake = document.createElement('div');
      flake.className = 'snowflake';

      flake.style.setProperty('--x', Math.random() * 100 + 'vw');
      flake.style.setProperty('--duration', 10 + Math.random() * 10 + 's');
      flake.style.setProperty('--drift', Math.random() * 80 - 40 + 'px');

      flake.style.transform = `translateY(${Math.random() * 100 - 100}vh)`;

      flake.style.animationDelay = `${Math.random() * 4}s`;

      container.appendChild(flake);
      created++;
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <HomeWrapper>
      <Snow className="snow-container" />

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
              top: '2rem',
              width: '100%',
              display: 'block',
            }}
            src="/assets/images/btn-bg.webp"
            alt="btn-bg"
            width={325}
            height={220}
            loading="eager"
            decoding="async"
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

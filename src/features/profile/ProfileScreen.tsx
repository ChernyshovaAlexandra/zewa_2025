import { PageContainer, PrizeIcon, TournamentIcon, ZewaButton } from '@/shared/ui';
// import { useUserStore } from '@/shared/model';
import {
  BG,
  Ellipse,
  FlexBetweenDiv,
  FlexColumnDiv,
  GroupStyled,
  MagicArc,
  MagicArcContainer,
} from './style';
import { useNavigate } from 'react-router-dom';
import { Coins } from '../coins/Coins';
import PrizesScale from '../prizes-scale';
import { telegramService } from '@/services/TelegramService';
import { useStartDataStore } from '@/shared/model';
import { useEffect } from 'react';
import { Snow } from '../home/HomeScreen.styles';

export function ProfileScreen() {
  const tgReferralLink = useStartDataStore((s) => s.tg_referral_link);
  const navigate = useNavigate();

  const handleShare = () => {
    if (!tgReferralLink) return;
    const text = '\nПрисоединяйся к игре от Zewa по моей ссылке — и выигрывай призы до 100 000 ₽!';
    const shareUrl =
      `https://t.me/share/url?` +
      `url=${encodeURIComponent(tgReferralLink)}` +
      `&text=${encodeURIComponent(text)}`;
    telegramService.openTelegramLink(shareUrl);
  };

  useEffect(() => {
    const container = document.querySelector('.snow-container');
    if (!container) return;

    let created = 0;
    const total = 25;

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
    <PageContainer
      fullscreen
      title="Личный кабинет"
      scrollable={false}
      onBack={() => navigate('/')}
      style={{
        background: 'linear-gradient(180deg, #0A1A2A 0%, #2F4D82 100%)',
      }}
    >
      <Snow className="snow-container" />
      <Ellipse />
      <MagicArcContainer>
        <MagicArc src="/assets/images/main/magic-arc.png" />
      </MagicArcContainer>
      <BG />
      <GroupStyled style={{ marginTop: 0 }}>
        <FlexBetweenDiv>
          <Coins />
          <ZewaButton variant="white" onClick={() => navigate('/tournament')}>
            <TournamentIcon />
          </ZewaButton>
        </FlexBetweenDiv>
        <FlexColumnDiv>
          <ZewaButton onClick={() => navigate('/prizes')} variant="white">
            <PrizeIcon /> Мои призы
          </ZewaButton>
          <ZewaButton variant="white" onClick={() => navigate('/history')}>
            <img src="/assets/images/snowflake.svg" />
            История начислений
          </ZewaButton>
          <ZewaButton variant="white" onClick={handleShare}>
            Поделиться игрой
          </ZewaButton>
        </FlexColumnDiv>
      </GroupStyled>
      <PrizesScale />
    </PageContainer>
  );
}

import {
  PageContainer,
  PrizeIcon,
  //  TournamentIcon,
  ZewaButton,
} from '@/shared/ui';
// import { useUserStore } from '@/shared/model';
import { FlexColumnDiv, GroupStyled } from './style';
import { useNavigate } from 'react-router-dom';
// import { Coins } from '../coins/Coins';
// import { HistoryIcon } from '@/shared/ui/icons/HistoryIcon';
// import PrizesScale from '../prizes-scale';
// import { telegramService } from '@/services/TelegramService';
// import { useStartDataStore } from '@/shared/model';

export function ProfileScreen() {
  // const tgReferralLink = useStartDataStore((s) => s.tg_referral_link);
  const navigate = useNavigate();

  // const handleShare = () => {
  //   if (!tgReferralLink) return;
  //   const text = '\nПрисоединяйся к игре от Zewa по моей ссылке — и выигрывай призы до 100 000 ₽!';
  //   const shareUrl =
  //     `https://t.me/share/url?` +
  //     `url=${encodeURIComponent(tgReferralLink)}` +
  //     `&text=${encodeURIComponent(text)}`;
  //   telegramService.openTelegramLink(shareUrl);
  // };

  return (
    <PageContainer
      fullscreen
      title="Личный кабинет"
      scrollable={false}
      onBack={() => navigate('/')}
    >
      <GroupStyled style={{ marginTop: 0 }}>
        {/* <FlexBetweenDiv>
          <Coins />
          <ZewaButton variant="white" onClick={() => navigate('/tournament')}>
            <TournamentIcon />
          </ZewaButton>
        </FlexBetweenDiv> */}
        <FlexColumnDiv>
          <ZewaButton onClick={() => navigate('/prizes')} variant="white">
            <PrizeIcon /> Мои призы
          </ZewaButton>
          {/* <ZewaButton variant="white" onClick={() => navigate('/history')}>
            <HistoryIcon />
            История начислений
          </ZewaButton>
          <ZewaButton variant="white" onClick={handleShare}>
            Поделиться игрой
          </ZewaButton> */}
        </FlexColumnDiv>
      </GroupStyled>
      {/* <PrizesScale /> */}
    </PageContainer>
  );
}

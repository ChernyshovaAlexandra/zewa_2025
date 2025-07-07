import { PageContainer, PrizeIcon, TournamentIcon, ZewaButton } from '@/shared/ui';
// import { useUserStore } from '@/shared/model';
import { FlexBetweenDiv, FlexColumnDiv, GroupStyled } from './style';
import { useNavigate } from 'react-router-dom';
import { Coins } from '../coins/Coins';
import { HistoryIcon } from '@/shared/ui/icons/HistoryIcon';
import PrizesScale from '../prizes-scale';

export function ProfileScreen() {
  // const user = useUserStore((s) => s.user);
  const navigate = useNavigate();

  return (
    <PageContainer fullscreen title="Личный кабинет" scrollable={false}>
      <GroupStyled style={{ marginTop: 0 }}>
        <FlexBetweenDiv>
          <Coins />
          <ZewaButton variant="white" onClick={() => navigate('/tournament')}>
            <TournamentIcon />
          </ZewaButton>
        </FlexBetweenDiv>
        {/* <StyledCentredImage src={'/images/name.png'} alt="name" /> */}

        <FlexColumnDiv>
          <ZewaButton onClick={() => navigate('/prizes')} variant="white">
            <PrizeIcon /> Мои призы
          </ZewaButton>
          <ZewaButton variant="white">
            <HistoryIcon />
            История начислений
          </ZewaButton>
          <ZewaButton variant="white">Поделиться игрой</ZewaButton>
        </FlexColumnDiv>
      </GroupStyled>
      <PrizesScale />
    </PageContainer>
  );
}

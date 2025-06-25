import { PageContainer, ZewaButton } from '@/shared/ui';
import { useUserStore } from '@/shared/model';
import { FlexBetweenDiv, FlexColumnDiv, GroupStyled } from './style';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProfileScreen() {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();


  return (
    <PageContainer fullscreen title="Личный кабинет" scrollable={false}>
      <GroupStyled style={{ marginTop: 0 }}>
        <FlexBetweenDiv>{/* <Coins /> */}</FlexBetweenDiv>
        {/* <StyledCentredImage src={'/images/name.png'} alt="name" /> */}

        <FlexColumnDiv>
          <ZewaButton onClick={() => navigate('/prizes')} variant="white">
            Мои призы
          </ZewaButton>
          <ZewaButton variant="white">История начислений</ZewaButton>
          <ZewaButton variant="white">Поделиться игрой</ZewaButton>
        </FlexColumnDiv>
      </GroupStyled>
      {/* <PrizesScale /> */}
    </PageContainer>
  );
}

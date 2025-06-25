import { PageContainer, ZewaButton } from '@/shared/ui';
import { useUserStore } from '@/shared/model';
import { FlexBetweenDiv, FlexColumnDiv, GroupStyled } from './style';

export function ProfileScreen() {
  const user = useUserStore((s) => s.user);

  return (
    <PageContainer fullscreen title="Личный кабинет" scrollable={false}>
      {/* {user ? (
        <Text size="p4" color="#fff">
          {user.firstName || `ID: ${user.id}`}
        </Text>
      ) : (
        <Text size="p4" color="#fff">
          Пользователь не найден
        </Text>
      )} */}

      <GroupStyled style={{ marginTop: 0 }}>
        <FlexBetweenDiv>{/* <Coins /> */}</FlexBetweenDiv>
        {/* <StyledCentredImage src={'/images/name.png'} alt="name" /> */}

        <FlexColumnDiv>
          <ZewaButton variant="white">Мои призы</ZewaButton>
          <ZewaButton variant="white">История начислений</ZewaButton>
          <ZewaButton variant="white">Поделиться игрой</ZewaButton>
        </FlexColumnDiv>
      </GroupStyled>
      {/* <PrizesScale /> */}
    </PageContainer>
  );
}

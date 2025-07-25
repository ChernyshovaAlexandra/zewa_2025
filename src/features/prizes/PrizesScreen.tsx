import { PageContainer, Text } from '@/shared/ui';
import { useState } from 'react';
import * as S from '../tournament/TournamentScreen.styles';
import { useUserStore } from '@/shared/model';
import PrizeContainer from './components/PrizeContainer';
import CouponContainer from './components/CouponContainer';
import { useNavigate } from 'react-router-dom';

export function PrizesScreen() {
  const [active, setActive] = useState<'promocodes' | 'prizes'>('promocodes');
  const userData = useUserStore((s) => s.userData);
  const navigate = useNavigate();
  const renderCoupons = () => {
    if (!userData) return <></>;
    return (
      <>
        {userData?.user?.coupons ? (
          userData.user.coupons.map((item, id) => (
            // {newCouponsMock.map((item, id) => (
            <CouponContainer key={id} coupon={item} activated showSnackbar={() => {}} />
          ))
        ) : (
          <Text>У вас пока нет промокодов</Text>
        )}
      </>
    );
  };

  const renderPrizes = () => (
    <>
      {userData?.user.prizes?.length ? (
        userData.user.prizes
          .slice()
          .reverse()
          .map((prize, id) => <PrizeContainer key={id} prize={prize} />)
      ) : (
        <Text weight={700} color="white" align="center">
          У вас пока нет призов.
        </Text>
      )}
    </>
  );

  return (
    <PageContainer fullscreen title="Мои призы" onBack={()=>navigate('/profile')}>
      <S.TabsWrapper>
        <S.Tabs>
          <S.TabButton $active={active === 'promocodes'} onClick={() => setActive('promocodes')}>
            Промокоды
          </S.TabButton>
          <S.TabButton $active={active === 'prizes'} onClick={() => setActive('prizes')}>
            Призы
          </S.TabButton>
        </S.Tabs>
      </S.TabsWrapper>
      {active === 'promocodes' ? renderCoupons() : renderPrizes()}
    </PageContainer>
  );
}

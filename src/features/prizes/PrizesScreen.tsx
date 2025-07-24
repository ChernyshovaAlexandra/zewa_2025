import { PageContainer, Text } from '@/shared/ui';
import { useState } from 'react';
import * as S from '../tournament/TournamentScreen.styles';
import { useUserStore } from '@/shared/model';
import PrizeContainer from './components/PrizeContainer';
import CouponContainer from './components/CouponContainer';
import { activatedCouponsMock, newCouponsMock } from './components/mocks';

export function PrizesScreen() {
  const [active, setActive] = useState<'promocodes' | 'prizes'>('promocodes');
  const userData = useUserStore((s) => s.userData);

  const renderCoupons = () => {
    if (!userData) return <></>;
    return (
      <>
        {/* {userData?.user.activated_coupons?.length > 0 &&
          userData.user.activated_coupons.map((item, id) => ( */}
        {newCouponsMock.map((item, id) => (
          <CouponContainer key={id} coupon={item} activated showSnackbar={() => {}} />
        ))}
        {/* {userData?.user.new_coupons?.length > 0 &&
          userData.user.new_coupons.map((item, id) => <CouponContainer key={id} coupon={item} />)} */}
        {activatedCouponsMock.map((item, id) => (
          <CouponContainer key={id} coupon={item} />
        ))}
        {/* {!userData?.user.activated_coupons?.length && !userData?.user.new_coupons?.length && (
          <Text weight={700} color="white" align="center">
            У вас пока нет промокодов.
          </Text>
        )} */}
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
    <PageContainer fullscreen title="Мои призы">
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
